import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetDogProfilesInput
  extends Pick<Prisma.DogProfileFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDogProfilesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: dogProfiles,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.dogProfile.count({ where }),
      query: (paginateArgs) => db.dogProfile.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      dogProfiles,
      nextPage,
      hasMore,
      count,
    }
  }
)
