import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  date,
  uniqueIndex,
  boolean
} from 'drizzle-orm/pg-core';
// import { boolean } from 'drizzle-orm/mysql-core';

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
export const todos = pgTable(
  'newtododata',
  {
    id: serial('id').primaryKey(),
    task: text('task').notNull(),
    completed: boolean('completed').default(false).notNull(),
    duedate: date('duedate').notNull(),
    createdat: date('createdat').defaultNow().notNull(),
  }
);

