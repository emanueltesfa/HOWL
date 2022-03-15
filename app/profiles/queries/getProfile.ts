import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetProfile = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetProfile), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const profile = await db.profile.findFirst({ where: { id } })

  if (!profile) throw new NotFoundError()

  return profile
})
