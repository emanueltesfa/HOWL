import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetProfilesInput
  extends Pick<Prisma.ProfileFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProfilesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: profiles,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.profile.count({ where }),
      query: (paginateArgs) => db.profile.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      profiles,
      nextPage,
      hasMore,
      count,
    }
  }
)
