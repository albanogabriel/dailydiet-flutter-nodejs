import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import bcrypt from "bcrypt"
import { checkTokenExists } from "../middlewares/check-token-exists"

export async function usersRoutes(app: FastifyInstance) {
  // Register User
  app.post("/", async (request, reply) => {
    const userRegisterSchema = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    })

    try {
      const { email, password } = userRegisterSchema.parse(request.body)

      const userExists = await knex("users").where({ email }).first()

      if (userExists) {
        return reply.status(400).send({ message: "User Already Exists" })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      await knex("users").insert({
        id: randomUUID(),
        email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      })

      return reply.status(201).send({ mesage: "user registered sucessfully" })
    } catch (error) {
      console.log(error)
      return reply.status(500)
    }
  })

  // Auth user
  app.post("/login", async (request, reply) => {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    try {
      const { email, password } = loginSchema.parse(request.body)

      const user = await knex("users").where({ email }).first()

      if (!user) {
        return reply.status(400).send({ message: "Invalid credentials" })
      }

      // Verificar a senha
      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if (!isPasswordCorrect) {
        return reply.status(400).send({ message: "Invalid credentials" })
      }

      // Gerar token JWT
      const token = app.jwt.sign({
        id: user.id,
        email: user.email,
      })

      return reply.send({ token })
    } catch (error) {
      console.log(error)
      return reply.status(500).send({ message: "Login failed" })
    }
  })

  // GET ALL USERS
  app.get(
    "/",
    {
      preValidation: [checkTokenExists],
    },
    async (request, reply) => {
      try {
        const users = await knex("users").select("*") // Seleciona todos os campos
        // const users = await knex("users").select("id", "email", "created_at", "updated_at") // selecionar tudo menos o password

        return reply.status(200).send(users)
      } catch (error) {
        console.log(error)
        return reply.status(500).send({ message: "Failed to retrieve users" })
      }
    }
  )

  // GET USER BY ID
  app.get(
    "/:id",
    { preValidation: [checkTokenExists] },
    async (request, reply) => {
      try {
        const getUserParamsSchema = z.object({
          id: z.string().uuid(),
        })

        const { id } = getUserParamsSchema.parse(request.params)

        // Query the user by ID
        const user = await knex("users").select("*").where({ id }).first()

        if (!user) {
          return reply.status(404).send({ message: "Error at find user" })
        }

        return reply.status(200).send({
          user,
        })
      } catch (error) {
        return reply.status(500).send({ message: "Internal server error" })
      }
    }
  )

  // delete user
  app.delete(
    "/:id",
    {
      preValidation: [checkTokenExists],
    },
    async (request, reply) => {
      const getUserParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getUserParamsSchema.parse(request.params)

      const deletedRow = await knex("users").where("id", id).del()

      if (deletedRow === 0) {
        return reply.status(404).send({
          message: "Error to delete User - User not found", // Ajustei a mensagem
        })
      }

      return reply.status(200).send({
        message: "User sucessfull deleted",
      })
    }
  )
}
