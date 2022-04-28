import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLocationsInput
  extends Pick<Prisma.LocationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLocationsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: locations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.location.count({ where }),
      query: (paginateArgs) => db.location.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      locations,
      nextPage,
      hasMore,
      count,
    }
  }
)
