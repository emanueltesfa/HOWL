import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateProfile = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateProfile), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const profile = await db.profile.create({ data: input })

  return profile
})
