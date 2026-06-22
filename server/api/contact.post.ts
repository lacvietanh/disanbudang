export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    email?: string
    subject?: string
    message?: string
  }>(event)

  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Vui lòng nhập đầy đủ họ tên, email và nội dung.',
    })
  }

  return {
    ok: true,
    receivedAt: new Date().toISOString(),
  }
})

