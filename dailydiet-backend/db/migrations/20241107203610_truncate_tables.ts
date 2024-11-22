import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Usar DELETE para remover todos os dados das tabelas
  await knex('users').del();
  await knex('meals').del();
}

export async function down(knex: Knex): Promise<void> {
  // Não é necessário fazer nada para desfazer, pois não há alterações estruturais
}
