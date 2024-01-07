import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import * as bcrypt from 'bcrypt';

export const recipeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return ctx.db.recipe.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    });
  }),

  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.recipe.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input.text,
              },
            },
            {
              ingredients: {
                contains: input.text,
              },
            },
            {
              instructions: {
                contains: input.text,
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        ingredients: z.string().min(10),
        servings: z.string().min(1),
        instructions: z.string().min(10),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = await ctx.db.user.findFirst({
        select: {
          id: true,
        },
      });

      let userId = existingUser?.id;

      if (!existingUser) {
        const newUser = await ctx.db.user.create({
          data: {
            name: 'Anonymous',
            email: 'anonymous@gmail.com',
            password: await bcrypt.hash('password123', 10),
          },
        });
        userId = newUser.id;
      }

      return ctx.db.recipe.create({
        data: {
          title: input.title,
          ingredients: input.ingredients,
          servings: input.servings,
          instructions: input.instructions,
          userId: userId as string,
        },
      });
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.recipe.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: true,
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(1).optional(),
        title: z.string().min(1).optional(),
        ingredients: z.string().min(10).optional(),
        servings: z.string().min(1).optional(),
        instructions: z.string().min(10).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { id, ...updatedData } = input;

      return ctx.db.recipe.update({
        where: { id },
        data: updatedData,
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.recipe.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
