import { JwtPayload } from 'jsonwebtoken';
import { Knex } from 'knex';
import { CustomJwtPayload } from '../middlewares/check-token-exists';

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string;
      email: string;
      password: string;
      name: string;
      age: string;
      created_at: Date;
      updated_at: Date;
    };
    meals: {
      id: string;
      user_id: string;
      name: string;
      description: string;
      date_time: Date;
      is_within_diet: boolean;
      created_at: Date;
      updated_at: Date;
    };
  }
}
