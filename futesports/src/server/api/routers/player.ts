
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const playerRouter = createTRPCRouter({
  getTaller: publicProcedure.query(({ ctx }) => {
    return ctx.db.players.findFirst({
      orderBy: { height: "desc" },
    });
  }),
  getSmaller: publicProcedure.query(({ ctx }) => {
    return ctx.db.players.findFirst({
      orderBy: { height: "asc" },
    });
  }),
});
