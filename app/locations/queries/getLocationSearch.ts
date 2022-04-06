/**
 *
 * File: /app/locations/queries/getLocationSearch.ts
 *
 * Gets n number [take parameter] of Topics by search_text
 *
 */

import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetLocation = z.object({
  // This accepts type of undefined, but is required at runtime
  search_text: z.string(),
  take: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetLocation),
  resolver.authorize(),
  async ({ search_text, take }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    if (search_text == " ") {
      search_text = "#######&%*$*^@^@##324324123fvcssafdsafds"
    }
    search_text = search_text?.trim()
    try {
      const locations = await db.location.findMany({
        where: {
          location_name: { contains: search_text, mode: "insensitive" },
          been_added: true,
        },
        orderBy: { created_at: "desc" },
        take: take,
        // include: { interaction_post_post: true }
      })
      if (!locations) throw new NotFoundError()
      return locations
    } catch (error) {
      console.log(error.message)
    }
  }
)
