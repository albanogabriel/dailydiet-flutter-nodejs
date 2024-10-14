import fastify from "fastify"
import { usersRoutes } from "./routes/users"
import jwt from "@fastify/jwt"
import { authRoutes } from "./routes/auth"
import { mealsRoutes } from "./routes/meals"
import { SummaryRoutes } from "./routes/summary"

export const app = fastify()

app.register(jwt, {
  secret: "supersecretkey",
})

app.register(usersRoutes, {
  prefix: "users",
})

app.register(authRoutes, {
  prefix: "auth",
})

app.register(mealsRoutes, {
  prefix: "meals",
})

app.register(SummaryRoutes, {
  prefix: "summary",
})
