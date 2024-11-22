import fastify from 'fastify';
import { usersRoutes } from './routes/users';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth';
import { mealsRoutes } from './routes/meals';
import { SummaryRoutes } from './routes/summary';
import cors from '@fastify/cors';

export const app = fastify();

// Registrar o CORS
app.register(cors, {
  origin: true, // Habilita acesso de qualquer origem
});

app.register(jwt, {
  secret: 'supersecretkey',
});

app.register(usersRoutes, {
  prefix: 'users',
});

app.register(authRoutes, {
  prefix: 'auth',
});

app.register(mealsRoutes, {
  prefix: 'meals',
});

app.register(SummaryRoutes, {
  prefix: 'summary',
});
