import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { checkTokenExists } from "../middlewares/check-token-exists"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { CustomUserJwtPayload } from "../@types/custom-user-jwt-payload"

export async function mealsRoutes(app: FastifyInstance) {
  // POST / Create Meal
  app.post(
    "/",
    { preValidation: [checkTokenExists] }, // Middleware para verificar o token
    async (request, reply) => {
      const createMealSchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        date_time: z.string(),
        is_within_diet: z.boolean(),
      })

      try {
        const { name, description, date_time, is_within_diet } =
          createMealSchema.parse(request.body)

        // Use o ID do usuário autenticado a partir do token JWT
        const userId = (request.user as CustomUserJwtPayload).id
        console.log(userId)

        // Criação da refeição associada ao usuário
        await knex("meals").insert({
          id: randomUUID(),
          user_id: userId,
          name,
          description,
          date_time: new Date(date_time),
          is_within_diet,
          created_at: new Date(),
          updated_at: new Date(),
        })

        return reply.status(201).send({ message: "Meal created successfully" })
      } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Failed to create meal" })
      }
    }
  )

  // DELETE / Delete Meal
  app.delete(
    "/:id",
    { preValidation: [checkTokenExists] },
    async (request, reply) => {
      const getUserParams = z.object({
        id: z.string().uuid(),
      })

      try {
        const { id } = getUserParams.parse(request.params)

        const deletedRow = await knex("meals").where("id", id).del()

        if (deletedRow === 0) {
          return reply.status(404).send({
            message: "Error to delete User - User not found",
          })
        }

        return reply.status(200).send({
          message: "Meal sucessfull deleted",
        })
      } catch (error) {
        return reply.status(500).send({ message: "Failed to delete a meal" })
      }
    }
  )

  // GET / MEALS
  app.get(
    "/",
    { preValidation: [checkTokenExists] },
    async (request, reply) => {
      try {
        // Use o ID do usuário autenticado a partir do token JWT
        const userId = (request.user as CustomUserJwtPayload).id

        // Busca as refeições associadas ao usuário
        const meals = await knex("meals").where("user_id", userId).select("*")

        return reply.status(200).send(meals)
      } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Failed to retrieve meals" })
      }
    }
  )

  // PATCH / PARTIAL UPDATE
  app.patch(
    "/:id",
    { preValidation: [checkTokenExists] },
    async (request, reply) => {
      try {
        // Validação do ID da refeição nos parâmetros da URL
        const getMealParamsId = z.object({
          id: z.string().uuid(),
        })

        // Validação dos dados parciais no corpo da requisição
        const updateMealSchema = z.object({
          name: z.string().optional(),
          description: z.string().optional(),
          date_time: z.string().optional(),
          is_within_diet: z.boolean().optional(),
        })

        const { id } = getMealParamsId.parse(request.params)
        const { name, description, date_time, is_within_diet } =
          updateMealSchema.parse(request.body)

        const userId = (request.user as CustomUserJwtPayload).id

        const updatedData = {
          name,
          description,
          date_time: date_time ? new Date(date_time) : undefined,
          is_within_diet,
          updated_at: new Date(),
        }

        // Atualiza somente os campos fornecidos
        const updatedRow = await knex("meals")
          .where("id", id)
          .andWhere("user_id", userId)
          .update(updatedData)

        if (updatedRow === 0) {
          return reply.status(404).send({
            message: "Meal not found or you don't have permission to update",
          })
        }

        return reply.status(200).send({
          message: "Meal updated successfully",
        })
      } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Failed to update meal" })
      }
    }
  )

  app.put(
    "/:id",
    { preValidation: [checkTokenExists] },
    async (request, reply) => {
      const getMealParamsId = z.object({
        id: z.string().uuid(),
      })

      try {
        const updateMealSchema = z.object({
          name: z.string(),
          description: z.string().optional(),
          date_time: z.string(),
          is_within_diet: z.boolean(),
        })

        const { id } = getMealParamsId.parse(request.params)
        const { name, description, date_time, is_within_diet } =
          updateMealSchema.parse(request.body)

        const userId = (request.user as CustomUserJwtPayload).id

        const updatedMeal = {
          name,
          description,
          date_time: new Date(date_time),
          is_within_diet,
          updated_at: new Date(),
        }

        const updatedRow = await knex("meals")
          .where("id", id)
          .andWhere("user_id", userId)
          .update(updatedMeal)

        if (updatedRow === 0) {
          return reply.status(404).send({
            message: "Meal not found or you don't have permission to update",
          })
        }

        return reply.status(200).send({
          message: "Meal updated successfully",
          meal: {
            ...updatedMeal,
          },
        })
      } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Failed to update meal" })
      }
    }
  )

  // GET MEAL BY ID
  app.get(
    "/:id",
    {
      preValidation: [checkTokenExists],
    },
    async (request, reply) => {
      const getMealIdParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealIdParamsSchema.parse(request.params)

      const findMealById = await knex("meals").where("id", id).first()

      if (!findMealById) {
        return reply.status(404).send({
          message: "Meal not found", // Updated the message to reflect "meal"
        })
      }

      return reply.status(200).send({
        message: "Meal found successfully", // Success message for finding a meal
        findMealById,
      })
    }
  )
}
