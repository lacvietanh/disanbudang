/**
 * GET /api/admin/visitors
 * List visitor logs with aggregate stats. Admin only.
 * Query: ?limit=100 ?offset=0
 */
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const query = getQuery(event)
  const limit = Math.min(Number(query.limit) || 100, 500)
  const offset = Number(query.offset) || 0

  const db = event.context.cloudflare?.env?.DB
  if (!db) throw createError({ statusCode: 503, statusMessage: 'Database unavailable' })

  const [rows, statsRaw, topPaths] = await Promise.all([
    db.prepare(
      `SELECT * FROM visitor_logs ORDER BY last_seen_at DESC LIMIT ? OFFSET ?`,
    ).bind(limit, offset).all(),

    db.prepare(
      `SELECT
         COUNT(*) as unique_ips,
         SUM(visit_count) as total_visits
       FROM visitor_logs`,
    ).first(),

    db.prepare(
      `SELECT path, SUM(visit_count) as total
       FROM visitor_logs
       GROUP BY path
       ORDER BY total DESC
       LIMIT 10`,
    ).all(),
  ])
  const stats = statsRaw as { unique_ips: number; total_visits: number } | null

  return {
    ok: true,
    visitors: rows.results ?? [],
    stats: {
      unique_ips: stats?.unique_ips ?? 0,
      total_visits: stats?.total_visits ?? 0,
    },
    top_paths: topPaths.results ?? [],
  }
})
