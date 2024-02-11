import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const playerRouter = createTRPCRouter({
  getByName: publicProcedure.input(z.object({ name: z.string().min(1) })).query(async ({ ctx, input }) => {
    const { name } = input;

    const players = await ctx.db.players.findMany({
      take: 5,
      where: {
        OR: [
          { name: { contains: name, mode: 'insensitive' } },
          { commonName: { contains: name, mode: 'insensitive' } }
        ]
      },
      include: {
        position: {
          select: {
            shortName: true
          }
        }
      },
      orderBy: { overallRating: "desc" },
    });
    if (!players) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return players
  }),
});
