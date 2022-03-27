import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteLoginAttempt = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteLoginAttempt),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const loginAttempt = await db.loginAttempts.deleteMany({ where: { id } })

    return loginAttempt
  }
)
