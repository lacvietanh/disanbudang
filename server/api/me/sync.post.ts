/**
 * POST /api/me/sync
 * Upsert Firebase Auth user data into the D1 users table.
 * Called from /me page after successful Firebase sign-in.
 * Body: { idToken: string }
 */
import { verifyFirebaseToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { idToken } = body ?? {}

  if (!idToken || typeof idToken !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing idToken' })
  }

  const claims = await verifyFirebaseToken(idToken)

  const db = event.context.cloudflare?.env?.DB
  if (!db) {
    throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })
  }

  const provider = (claims.firebase?.sign_in_provider) ?? 'unknown'

  try {
    await db.prepare(`
      INSERT INTO users (uid, email, display_name, photo_url, email_verified, provider, last_seen_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(uid) DO UPDATE SET
        email          = excluded.email,
        display_name   = COALESCE(excluded.display_name, users.display_name),
        photo_url      = COALESCE(excluded.photo_url, users.photo_url),
        email_verified = excluded.email_verified,
        last_seen_at   = CURRENT_TIMESTAMP
    `).bind(
      claims.uid,
      claims.email,
      claims.name ?? null,
      claims.picture ?? null,
      claims.email_verified ? 1 : 0,
      provider,
    ).run()
  } catch (err) {
    console.error('[me/sync] DB error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to sync user data' })
  }

  return { ok: true }
})
