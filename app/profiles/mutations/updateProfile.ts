import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateProfile = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateProfile),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const profile = await db.profile.update({ where: { id }, data })

    return profile
  }
)
