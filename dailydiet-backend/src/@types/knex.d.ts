import { Knex } from "knex"

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string
      email: string
      password: string
      created_at: Date
      updated_at: Date
    }
  }
}