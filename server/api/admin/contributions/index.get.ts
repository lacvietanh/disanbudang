/**
 * GET /api/admin/contributions
 * List contributions filtered by status. Admin only.
 * Query: ?status=pending|approved|rejected|all  (default: pending)
 *        ?limit=50  ?offset=0
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const status = query.status as string | undefined
  const limit = Math.min(Number(query.limit) || 50, 100)
  const offset = Number(query.offset) || 0

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  let rows
  if (!status || status === 'all') {
    rows = await db.prepare(
      `SELECT * FROM contributions ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    ).bind(limit, offset).all()
  } else {
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid status filter' })
    }
    rows = await db.prepare(
      `SELECT * FROM contributions WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    ).bind(status, limit, offset).all()
  }

  // Get counts per status for badge display
  const counts = await db.prepare(
    `SELECT status, COUNT(*) as count FROM contributions GROUP BY status`,
  ).all()

  const statusCounts: Record<string, number> = { pending: 0, approved: 0, rejected: 0 }
  for (const row of (counts.results ?? [])) {
    const r = row as { status: string; count: number }
    statusCounts[r.status] = r.count
  }

  return {
    ok: true,
    contributions: rows.results ?? [],
    counts: statusCounts,
    total: Object.values(statusCounts).reduce((a, b) => a + b, 0),
  }
})
