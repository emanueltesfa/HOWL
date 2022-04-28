import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePost = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeletePost), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.deleteMany({ where: { id } })

  return post
})
