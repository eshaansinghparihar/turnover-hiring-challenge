/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { faker } from '@faker-js/faker';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const generateCategories = () => {
  const categories = [];
  for (let i = 0; i < 100; i++) {
    categories.push(faker.commerce.product());
  }
  return categories;
};

export const categoryRouter = createTRPCRouter({
  generateCategories: publicProcedure
    .input(z.object({}))
    .query(() => {
      const generatedCategories = generateCategories();
      return generatedCategories;
    }),

    pushCategory: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      
      await ctx.db.category.createMany({
        data: input.map(name => ({ name })),
        skipDuplicates: true
      });

      console.log('Push to DB Successful');
    }),
    getCategoriesForPagination: publicProcedure
    .input(z.object({ page: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const { page } = input;
      const categories = await ctx.db.category.findMany({
        take: 6,               
        skip: (page - 1) * 6,
      });

      if(categories.length === 0) throw new Error("No Results Found")

      return categories;
    }),
});
