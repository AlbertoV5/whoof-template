import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"

import { whopSdk } from "@/lib/server/whop"

export default new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        name: z.string(),
      })
    ),
    (c) => {
      const { name } = c.req.valid("query")
      return c.json({
        ok: true,
        message: `Hello ${name}!`,
      })
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        userId: z.string(),
      })
    ),
    async (c) => {
      const { userId } = c.req.valid("json")
      const user = await whopSdk.users.getUser({ userId })
      if (!user) {
        return c.json(
          {
            ok: false,
            message: "User not found",
          },
          404
        )
      }
      return c.json(
        {
          ok: true,
          name: user.name || user.username,
        },
        200
      )
    }
  )
