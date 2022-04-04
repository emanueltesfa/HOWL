import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateUserLike = z.object({
  created_by: z.number(),
  user_id: z.number(),
  post_id: z.number(),
})

export default resolver.pipe(resolver.zod(CreateUserLike), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const userLike = await db.userLike.create({ data: input })

  return userLike
})
