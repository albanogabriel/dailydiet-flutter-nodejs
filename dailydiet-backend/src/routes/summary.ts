import { FastifyInstance } from "fastify"
import { checkTokenExists } from "../middlewares/check-token-exists"
import { CustomUserJwtPayload } from "../@types/custom-user-jwt-payload"
import { knex } from "../database"

// Define the expected shape of the result from knex count queries

export async function SummaryRoutes(app: FastifyInstance) {
  app.get("/", { preValidation: checkTokenExists }, async (request, reply) => {
    // Retrieve the authenticated user's ID from the JWT token
    const userId = (request.user as CustomUserJwtPayload).id

    try {
      // Query to get the total number of meals for the user
      const totalMealsResult = await knex("meals")
        .where("user_id", userId)
        .count({ count: "*" }) // Alias 'count' to make sure we get the correct property name
        .first()

      // Query to count meals that are within the diet
      const withinDietCountResult = await knex("meals")
        .where("user_id", userId)
        .andWhere("is_within_diet", true)
        .count({ count: "*" }) // Alias 'count'
        .first()

      // Query to count meals that are outside the diet
      const outsideDietCountResult = await knex("meals")
        .where("user_id", userId)
        .andWhere("is_within_diet", false)
        .count({ count: "*" }) // Alias 'count'
        .first()

      // Constructing the summary object
      const summary = {
        totalMeals: Number(totalMealsResult?.count) || 0, // Convert to number
        withinDietCount: Number(withinDietCountResult?.count) || 0, // Convert to number
        outsideDietCount: Number(outsideDietCountResult?.count) || 0, // Convert to number
      }

      return reply.status(200).send(summary)
    } catch (error) {
      return reply.status(500).send({ message: "Failed to retrieve summary" })
    }
  })
}
