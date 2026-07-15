/**
 * POST /api/ratings
 * Submit a star rating + optional comment. One per IP (upsert).
 * Body: { stars: 1-5, comment?: string, turnstileToken?: string }
 *
 * Rate of change: unlimited upserts allowed — user can update their rating.
 * One row per IP — updating is an upsert.
 */
import { requireClient } from '../../utils/turnstile'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { stars, comment, turnstileToken } = body ?? {}

  // 1. Client guard (origin + Turnstile in production)
  const { ip } = await requireClient(event, turnstileToken)

  // 2. Validate stars
  const starsNum = Number(stars)
  if (!Number.isInteger(starsNum) || starsNum < 1 || starsNum > 5) {
    throw createError({ statusCode: 400, statusMessage: 'stars must be an integer 1–5' })
  }

  // 3. Validate comment (optional)
  let sanitizedComment: string | null = null
  if (comment && typeof comment === 'string') {
    const trimmed = comment.trim()
    if (trimmed.length > 500) {
      throw createError({ statusCode: 400, statusMessage: 'Comment must be 500 characters or fewer' })
    }
    sanitizedComment = trimmed || null
  }

  // 4. DB upsert — one row per IP
  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  try {
    await db.prepare(`
      INSERT INTO ratings (ip, stars, comment)
      VALUES (?, ?, ?)
      ON CONFLICT(ip) DO UPDATE SET
        stars   = excluded.stars,
        comment = excluded.comment
    `).bind(ip, starsNum, sanitizedComment).run()
  } catch (err) {
    console.error('[ratings.post] DB error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save rating' })
  }

  return { ok: true }
})
