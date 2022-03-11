import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDogProfile = z.object({
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateDogProfile),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const dogProfile = await db.dogProfile.create({ data: input })

    return dogProfile
  }
)
