/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { z } from "zod";
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
  getByName: publicProcedure.input(
    z.object({
      name: z.string(),
    })
  ).query(async ({ ctx, input }) => {
    return ctx.db.players.findMany({
      where: { name: input.name },
    });
  }),
});