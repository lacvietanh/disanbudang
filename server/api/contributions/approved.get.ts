/**
 * GET /api/contributions/approved
 * Public endpoint — no auth required.
 * Returns the latest approved contributions for display on the /contribute page.
 * Query: ?limit=12 ?offset=0
 *
 * Fields returned are safe for public display:
 *   id, type, title, author_name, author_role, heritage_id, created_at, excerpt
 * Fields intentionally excluded:
 *   ip, review_note, reviewed_by, content (full), files_data
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 12, 50)
  const offset = Number(query.offset) || 0

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const [rows, countRow] = await Promise.all([
    db.prepare(`
      SELECT
        id,
        type,
        title,
        author_name,
        author_role,
        heritage_id,
        created_at,
        substr(content, 1, 200) AS excerpt
      FROM contributions
      WHERE status = 'approved'
      ORDER BY reviewed_at DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all(),

    db.prepare(
      'SELECT COUNT(*) as total FROM contributions WHERE status = "approved"',
    ).first(),
  ])

  return {
    ok: true,
    contributions: rows.results ?? [],
    total: (countRow as { total: number } | null)?.total ?? 0,
  }
})
