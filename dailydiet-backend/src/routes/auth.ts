import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import bcrypt from "bcrypt"

export async function authRoutes(app: FastifyInstance) {
  // Auth user
  app.post("/", async (request, reply) => {
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
}
