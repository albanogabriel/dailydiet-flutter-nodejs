import { FastifyReply, FastifyRequest } from "fastify"
import { app } from "../app"

export interface CustomUserJwtPayload {
  id: string
  email: string
}

export async function checkTokenExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({ message: "Authorization header missing" })
  }

  // Extraia o token do cabeçalho
  const token = authHeader.split(" ")[1]

  if (!token) {
    return reply.status(401).send({ message: "Token missing" })
  }

  try {
    // Tenta verificar o token JWT
    const decoded = (await app.jwt.verify(token)) as CustomUserJwtPayload

    request.user = decoded
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" })
  }
}
