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
      return generatedCategories; // Return the generated categories directly
    }),

    pushCategory: publicProcedure
    .input(z.array(z.string())) // Input schema for array of strings
    .mutation(async ({ ctx, input }) => {
      // Push the categories to the database
      await ctx.db.category.createMany({
        data: input.map(name => ({ name })),
        skipDuplicates: true
      });

      console.log('Push to DB Successful');
    }),
});
