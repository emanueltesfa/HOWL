import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateLoginAttempt = z.object({
  created_by: z.number(),
  user_id: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateLoginAttempt),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const loginAttempt = await db.loginAttempts.create({ data: input })

    return loginAttempt
  }
)
