import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLoginAttemptsInput
  extends Pick<Prisma.loginAttemptsFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetLoginAttemptsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: loginAttempts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.loginAttempts.count({ where }),
      query: (paginateArgs) => db.loginAttempts.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      loginAttempts,
      nextPage,
      hasMore,
      count,
    }
  }
)
