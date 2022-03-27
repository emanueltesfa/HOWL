import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetLoginAttemptsInput
  extends Pick<Prisma.LoginAttemptFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

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
      count: () => db.loginAttempt.count({ where }),
      query: (paginateArgs) => db.loginAttempt.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      loginAttempts,
      nextPage,
      hasMore,
      count,
    }
  }
)
