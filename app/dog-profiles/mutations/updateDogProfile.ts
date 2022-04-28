import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDogProfile = z.object({
  id: z.number(),
  dog_profile_pic: z.string(),
  pet_name: z.string(),
  breed: z.string(),
  age: z.number(),
  sex: z.string(),
  temperament: z.string(),
  user_id: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateDogProfile),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const dogProfile = await db.dogProfile.update({ where: { id }, data })

    return dogProfile
  }
)
