import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetDogProfile = z.object({
  // This accepts type of undefined, but is required at runtime
  user_id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetDogProfile),
  resolver.authorize(),
  async ({ user_id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const dogProfile = await db.dogProfile.findFirst({ where: { user_id } })

    if (!dogProfile) throw new NotFoundError()

    return dogProfile
  }
)
