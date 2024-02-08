import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const playerRouter = createTRPCRouter({
  getByName: publicProcedure.input(z.object({ name: z.string().min(1) })).query(async ({ ctx, input }) => {
    const { name } = input;
    
    return await ctx.db.players.findMany({
      where: {
        name: {
          contains: name
        }
      },
      orderBy: { createdAt: "desc" },
    });
  }),
});
