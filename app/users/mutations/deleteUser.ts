import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteUser = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteUser), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.deleteMany({ where: { id } })

  return user
})
