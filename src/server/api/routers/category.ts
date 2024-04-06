import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({})) // Empty input schema (no filtering)
    .query(({ ctx }) => {
      // Fetch all categories with pagination:
      const categories =  ctx.db.category.findMany({
        take: 20, // Limit to 20 results
        skip: 0,   // Start from the beginning (optional for pagination)
      });

      return categories;
    }),
  //   createCategory: publicProcedure
  // .input(z.object({ name: z.string().min(1) })) // Input expects a category name
  // .mutation(async ({ ctx, input }) => {
  //   // Create the category without a user:
  //   const categoryData = {
  //     name: input.name,
  //   };
    
  //   if (userId) {
  //     categoryData.user = {
  //       connect: {
  //         id: userId // Replace userId with the actual ID of the user you want to associate the category with
  //       }
  //     };
  //   }
    
  //   const category = await ctx.db.category.create({
  //     data: categoryData,
  //   });
    
  //   return category;
  // }),

    // createCategory: publicProcedure
    // .input(z.object({ categoryId: z.number().required() })) // Input now expects category ID
    // .mutation(async ({ ctx, input }) => {
    //   // Find the selected category:
    //   const selectedCategory = await ctx.db.category.findUnique({
    //     where: { id: input.categoryId },
    //   });
  
    //   if (!selectedCategory) {
    //     throw new Error("Category not found"); // Handle invalid category ID
    //   }
  
    //   // Find the current user:
    //   const currentUser = await ctx.auth.getUser();
  
    //   // Attach the selected category to the user:
    //   currentUser.categories.push(selectedCategory);
    //   await ctx.db.user.update({
    //     where: { id: currentUser.id },
    //     data: { categories: currentUser.categories },
    //   });
  
    //   return { message: "Category selected successfully" };
    // }),
  
});

