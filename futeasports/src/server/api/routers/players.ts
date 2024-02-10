import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const playerRouter = createTRPCRouter({
  getByName: publicProcedure.input(z.object({ name: z.string().min(1) })).query(async ({ ctx, input }) => {
    const { name } = input;

    const players = await ctx.db.players.findMany({
      take: 1,
      where: {
        name: {
          contains: name
        }
      },
      orderBy: { rank: "asc" },
    });
    if (!players) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return players
  }),
});
