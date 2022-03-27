import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateLoginAttempt = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateLoginAttempt),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const loginAttempt = await db.loginAttempts.update({ where: { id }, data })

    return loginAttempt
  }
)
