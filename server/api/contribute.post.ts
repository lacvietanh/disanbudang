export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const fields = new Map<string, string>()
  const files: Array<{ name: string, filename: string, type?: string, size: number }> = []

  for (const part of parts ?? []) {
    if (!part.name) continue
    if (part.filename) {
      files.push({
        name: part.name,
        filename: part.filename,
        type: part.type,
        size: part.data.length,
      })
    } else {
      fields.set(part.name, part.data.toString('utf8'))
    }
  }

  if (!fields.get('name') || !fields.get('title') || !fields.get('content')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Vui lòng nhập đầy đủ thông tin người gửi, tiêu đề và nội dung tư liệu.',
    })
  }

  return {
    ok: true,
    files,
    receivedAt: new Date().toISOString(),
  }
})
