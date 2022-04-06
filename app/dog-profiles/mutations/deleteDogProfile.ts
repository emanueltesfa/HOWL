import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteDogProfile = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteDogProfile),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const dogProfile = await db.dogProfile.deleteMany({ where: { id } })

    return dogProfile
  }
)
