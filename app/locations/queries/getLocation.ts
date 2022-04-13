import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetLocation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetLocation), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const location = await db.location.findFirst({ where: { id } })

  if (!location) throw new NotFoundError()

  return location
})
