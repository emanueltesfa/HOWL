import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPost = z.object({
  // This accepts type of undefined, but is required at runtime
  search_text: z.string(),
  take: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetPost),
  resolver.authorize(),
  async ({ search_text, take }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    if (search_text == " ") {
      search_text = "#######&%*$*^@^@##324324123fvcssafdsafds"
    }
    search_text = search_text?.trim()
    try {
      const topics = await db.post.findMany({
        where: {
          id: { gt: 0 },
          body: { contains: search_text, mode: "insensitive" },
          is_disabled: false,
        },
        orderBy: { created_at: "desc" },
        take: take,
        // include: { interaction_post_post: true }
      })
      if (!topics) throw new NotFoundError()
      return topics
    } catch (error) {
      console.log(error.message)
    }
  }
)
