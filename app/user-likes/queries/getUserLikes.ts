import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetUserLikesInput
  extends Pick<Prisma.UserLikeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetUserLikesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: userLikes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.userLike.count({ where }),
      query: (paginateArgs) => db.userLike.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      userLikes,
      nextPage,
      hasMore,
      count,
    }
  }
)
