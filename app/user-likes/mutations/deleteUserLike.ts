import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteUserLike = z.object({
  post_id: z.number(),
  user_id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteUserLike),
  resolver.authorize(),
  async ({ post_id, user_id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userLike = await db.userLike.deleteMany({ where: { post_id, user_id } })

    return userLike
  }
)
