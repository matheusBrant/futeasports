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

  getPlayers: publicProcedure.input(z.object({ page: z.number().min(1) })).query(async ({ ctx, input }) => {
    const { page } = input;

    const players = await ctx.db.players.findMany({
      skip: 18 * (page - 1),
      take: 18,
      select: { shieldUrl: true },
      orderBy: [
        {
          overallRating: 'desc',
        },
        {
          rank: 'asc',
        },
        {
          name: 'asc',
        }
      ],
    });

    if (!players) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return players
  }),

  getFlags: publicProcedure.input(z.object({ page: z.number().min(1) })).query(async ({ ctx }) => {
    const totalCount = await ctx.db.nationalities.count()

    const randomIndex = Math.floor(Math.random() * totalCount)

    const flags = await ctx.db.nationalities.findMany({
      skip: randomIndex,
      take: 1,
      select: { imageUrl: true, name: true },
      orderBy: {
        name: 'asc',
      }
    });

    if (!flags) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return flags
  }),

  buildSquad: publicProcedure.input(z.object({ page: z.boolean() })).query(async ({ ctx }) => {
    const position = await ctx.db.positions.findFirst({
      where: {
        shortName: 'GK'
      }
    });

    if (!position) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
    const players = await ctx.db.players.findMany({
      take: 11,
      orderBy: {
        name: 'asc',
      },
      where: {
        idPosition: position.idApi // Use o ID da posição na consulta where
      },
      select: {
        name: true,
        avatarUrl: true,
        position: {
          select: {
            shortName: true
          }
        }
      },
    });

    if (!players) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    return players
  }),
});
