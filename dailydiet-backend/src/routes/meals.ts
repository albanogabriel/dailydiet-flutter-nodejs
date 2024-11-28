import { FastifyInstance } from 'fastify';
import { knex } from '../database';
import { checkTokenExists } from '../middlewares/check-token-exists';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { CustomUserJwtPayload } from '../@types/custom-user-jwt-payload';

export async function mealsRoutes(app: FastifyInstance) {
  // POST / Create Meal
  app.post(
    '/',
    { preValidation: [checkTokenExists] }, // Middleware para verificar o token
    async (request, reply) => {
      const createMealSchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        date_time: z.string(),
        is_within_diet: z.boolean(),
      });

      try {
        const { name, description, date_time, is_within_diet } = createMealSchema.parse(request.body);

        // Use o ID do usuário autenticado a partir do token JWT
        const userId = (request.user as CustomUserJwtPayload).id;
        console.log(userId);

        // Criação da refeição associada ao usuário
        await knex('meals').insert({
          id: randomUUID(),
          user_id: userId,
          name,
          description,
          date_time: new Date(date_time),
          is_within_diet,
          created_at: new Date(),
          updated_at: new Date(),
        });

        return reply.status(201).send({ message: 'Meal created successfully' });
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: 'Failed to create meal' });
      }
    }
  );

  // DELETE / Delete Meal
  app.delete('/:id', { preValidation: [checkTokenExists] }, async (request, reply) => {
    const getUserParams = z.object({
      id: z.string().uuid(),
    });

    try {
      const { id } = getUserParams.parse(request.params);

      const deletedRow = await knex('meals').where('id', id).del();

      if (deletedRow === 0) {
        return reply.status(404).send({
          message: 'Error to delete User - User not found',
        });
      }

      return reply.status(200).send({
        message: 'Meal sucessfull deleted',
      });
    } catch (error) {
      return reply.status(500).send({ message: 'Failed to delete a meal' });
    }
  });

  // GET / MEALS
  app.get('/', { preValidation: [checkTokenExists] }, async (request, reply) => {
    try {
      // Use o ID do usuário autenticado a partir do token JWT
      const userId = (request.user as CustomUserJwtPayload).id;

      // Busca as refeições associadas ao usuário
      const meals = await knex('meals').where('user_id', userId).select('*');

      return reply.status(200).send(meals);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: 'Failed to retrieve meals' });
    }
  });

  // PATCH / PARTIAL UPDATE
  app.patch('/:id', { preValidation: [checkTokenExists] }, async (request, reply) => {
    try {
      // Validação do ID da refeição nos parâmetros da URL
      const getMealParamsId = z.object({
        id: z.string().uuid(),
      });

      // Validação dos dados parciais no corpo da requisição
      const updateMealSchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        date_time: z.string().optional(),
        is_within_diet: z.boolean().optional(),
      });

      const { id } = getMealParamsId.parse(request.params);
      const { name, description, date_time, is_within_diet } = updateMealSchema.parse(request.body);

      const userId = (request.user as CustomUserJwtPayload).id;

      const updatedData = {
        name,
        description,
        date_time: date_time ? new Date(date_time) : undefined,
        is_within_diet,
        updated_at: new Date(),
      };

      // Atualiza somente os campos fornecidos
      const updatedRow = await knex('meals').where('id', id).andWhere('user_id', userId).update(updatedData);

      if (updatedRow === 0) {
        return reply.status(404).send({
          message: "Meal not found or you don't have permission to update",
        });
      }

      return reply.status(200).send({
        message: 'Meal updated successfully',
      });
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: 'Failed to update meal' });
    }
  });

  app.put('/:id', { preValidation: [checkTokenExists] }, async (request, reply) => {
    const getMealParamsId = z.object({
      id: z.string().uuid(),
    });

    try {
      const updateMealSchema = z.object({
        name: z.string(),
        description: z.string().optional(),
        date_time: z.string(),
        is_within_diet: z.boolean(),
      });

      const { id } = getMealParamsId.parse(request.params);
      const { name, description, date_time, is_within_diet } = updateMealSchema.parse(request.body);

      const userId = (request.user as CustomUserJwtPayload).id;

      const updatedMeal = {
        name,
        description,
        date_time: new Date(date_time),
        is_within_diet,
        updated_at: new Date(),
      };

      const updatedRow = await knex('meals').where('id', id).andWhere('user_id', userId).update(updatedMeal);

      if (updatedRow === 0) {
        return reply.status(404).send({
          message: "Meal not found or you don't have permission to update",
        });
      }

      return reply.status(200).send({
        message: 'Meal updated successfully',
        meal: {
          ...updatedMeal,
        },
      });
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: 'Failed to update meal' });
    }
  });

  // GET MEAL BY ID
  app.get(
    '/:id',
    {
      preValidation: [checkTokenExists],
    },
    async (request, reply) => {
      const getMealIdParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getMealIdParamsSchema.parse(request.params);

      const findMealById = await knex('meals').where('id', id).first();

      if (!findMealById) {
        return reply.status(404).send({
          message: 'Meal not found', // Updated the message to reflect "meal"
        });
      }

      return reply.status(200).send({
        message: 'Meal found successfully', // Success message for finding a meal
        findMealById,
      });
    }
  );

  interface Meal {
    id: string;
    user_id: string;
    name: string;
    description: string;
    date_time: Date;
    is_within_diet: boolean;
    created_at: Date;
    updated_at: Date;
  }

  interface MealWithHour extends Meal {
    hour: string;
  }

  interface GroupedMeal {
    [year: string]: MealWithHour[];
  }

  // GET /grouped-by-year - using object
  app.get('/grouped-by-year', { preValidation: [checkTokenExists] }, async (request, reply) => {
    try {
      const userId = (request.user as CustomUserJwtPayload).id;

      // Recupera todas as refeições do usuário
      const meals = await knex('meals').where('user_id', userId).select('*');

      // Agrupa as refeições por data
      const groupedMeals = meals.reduce((acc: GroupedMeal, meal: Meal) => {
        const year = new Date(meal.date_time).toLocaleDateString('pt-BR'); // Formata a data para DD/MM/YYYY
        const hour = new Date(meal.date_time).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        if (!acc[year]) {
          acc = { ...acc, [year]: [] };
        }

        acc[year].push({ ...meal, hour }); // Adiciona o campo `hour` ao objeto

        return acc;
      }, {});

      return reply.status(200).send(groupedMeals);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: 'Failed to retrieve grouped meals' });
    }
  });

  interface GroupedMealArray {
    year: string;
    meals: MealWithHour[];
  }

  // GET /grouped-by-year - using array and sorted by year
  app.get('/grouped-by-year-array', { preValidation: [checkTokenExists] }, async (request, reply) => {
    try {
      const userId = (request.user as CustomUserJwtPayload).id;

      // Recupera todas as refeições do usuário
      const meals = await knex('meals').where('user_id', userId).select('*');

      const groupedMeals = meals.reduce((acc: GroupedMealArray[], meal: Meal) => {
        const date = new Date(meal.date_time);
        const formattedDate = date.toISOString().split('T')[0]; // Formata como 'YYYY-MM-DD'

        const hour = date.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        // Encontra ou cria o grupo pelo ano
        const existingGroup = acc.find((group) => group.year === formattedDate);

        if (!existingGroup) {
          acc.push({ year: formattedDate, meals: [{ ...meal, hour }] });
        } else {
          existingGroup.meals.push({ ...meal, hour });
        }

        return acc;
      }, []);

      // Ordena os grupos por ano (desc)
      groupedMeals.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());

      // Ordena refeições dentro de cada grupo por hora (desc)
      groupedMeals.forEach((group) => {
        group.meals.sort((a, b) => {
          const timeA = new Date(`${group.year}T${a.hour}`).getTime();
          const timeB = new Date(`${group.year}T${b.hour}`).getTime();
          return timeB - timeA;
        });
      });

      return reply.status(200).send(groupedMeals);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({ message: 'Failed to retrieve grouped meals' });
    }
  });

  // Se dateB - dateA for positivo (dateB é mais recente que dateA): Isso significa que dateB deve aparecer antes de dateA no array. Portanto, dateB vai para a frente e dateA vai para trás. Isso coloca as datas mais recentes primeiro (ordem decrescente).
  // Se dateB - dateA for negativo (dateA é mais recente que dateB): Isso significa que dateA deve vir antes de dateB. Ou seja, dateA vai para frente e dateB vai para trás. Nesse caso, a ordem será crescente.
  // Se dateB - dateA for zero (ou seja, as duas datas são iguais): Não há troca de posição, já que o valor de ambos os elementos é o mesmo.

  app.get('/stats', { preValidation: [checkTokenExists] }, async (request, reply) => {
    try {
      const userId = (request.user as CustomUserJwtPayload).id;

      const meals = (await knex('meals').where('user_id', userId).select('*')).map((meal) => ({
        ...meal,
        is_within_diet: Boolean(meal.is_within_diet), // Converte para boolean
      }));

      const stats = meals.reduce(
        (acc, meal) => {
          if (meal.is_within_diet === true) {
            acc.withinDiet++;
            acc.currentStreak++;
            acc.bestStreak = Math.max(acc.bestStreak, acc.currentStreak);
            acc.totalMeals = meals.length;
          } else {
            acc.outsideDiet++;
            acc.currentStreak = 0;
          }
          return acc;
        },
        {
          withinDiet: 0,
          outsideDiet: 0,
          currentStreak: 0,
          bestStreak: 0,
          totalMeals: 0,
        }
      );

      return reply.status(200).send(stats);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: 'Failed to retrieve grouped meals' });
    }
  });
}
