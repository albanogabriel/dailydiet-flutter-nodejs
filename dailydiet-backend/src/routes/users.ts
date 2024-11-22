import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { checkTokenExists } from '../middlewares/check-token-exists';

export async function usersRoutes(app: FastifyInstance) {
  // Register User
  app.post('/', async (request, reply) => {
    const userRegisterSchema = z.object({
      email: z.string().email('Invalid email format'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      name: z.string().min(3, 'Seu nome precisa ter mais de 3 dígitos'),
      age: z.string().min(1, 'Insira uma data válida'),
    });

    try {
      const { email, password, name, age } = userRegisterSchema.parse(
        request.body
      );

      const userExists = await knex('users').where({ email }).first();

      if (userExists) {
        return reply.status(400).send({ message: 'User Already Exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      await knex('users').insert({
        id: randomUUID(),
        email,
        password: hashedPassword,
        name,
        age,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return reply.status(201).send({ mesage: 'user registered sucessfully' });
    } catch (error) {
      console.log(error);
      return reply.status(500);
    }
  });

  // GET ALL USERS
  app.get(
    '/',
    {
      preValidation: [checkTokenExists],
    },
    async (request, reply) => {
      try {
        // const users = await knex('users').select('*'); // Seleciona todos os campos
        const users = await knex('users').select(
          'id',
          'email',
          'name',
          'age',
          'created_at',
          'updated_at'
        ); // selecionar tudo menos o password

        return reply.status(200).send(users);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: 'Failed to retrieve users' });
      }
    }
  );

  // GET USER BY ID
  app.get(
    '/:id',
    { preValidation: [checkTokenExists] },
    async (request, reply) => {
      try {
        const getUserParamsSchema = z.object({
          id: z.string().uuid(),
        });

        const { id } = getUserParamsSchema.parse(request.params);

        // Query the user by ID
        // const user = await knex('users').select('*').where({ id }).first(); // get all
        const user = await knex('users')
          .select('id', 'email', 'name', 'age', 'created_at', 'updated_at')
          .where({ id })
          .first(); // get all

        if (!user) {
          return reply.status(404).send({ message: 'Error at find user' });
        }

        return reply.status(200).send({
          user,
        });
      } catch (error) {
        return reply.status(500).send({ message: 'Internal server error' });
      }
    }
  );

  // delete user
  app.delete(
    '/:id',
    {
      preValidation: [checkTokenExists],
    },
    async (request, reply) => {
      const getUserParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getUserParamsSchema.parse(request.params);

      const deletedRow = await knex('users').where('id', id).del();

      if (deletedRow === 0) {
        return reply.status(404).send({
          message: 'Error to delete User - User not found', // Ajustei a mensagem
        });
      }

      return reply.status(200).send({
        message: 'User sucessfull deleted',
      });
    }
  );
}
