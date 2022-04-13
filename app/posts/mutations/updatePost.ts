import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePost = z.object({
  id: z.number(),
  body: z.string(),
  created_by: z.number(),
  is_disabled: z.boolean(),
  like_count: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.update({ where: { id }, data })

    return post
  }
)
