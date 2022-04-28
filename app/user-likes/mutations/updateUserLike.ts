import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateUserLike = z.object({
  id: z.number(),
  post_id: z.number(),
  user_id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateUserLike),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const userLike = await db.userLike.update({ where: { id }, data })

    return userLike
  }
)
