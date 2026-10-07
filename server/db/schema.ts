import { sql } from "drizzle-orm";
import {
  integer,
  real,
  sqliteTable,
  text,
  foreignKey,
} from "drizzle-orm/sqlite-core";

const createdAt = () =>
  integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`);

export const products = sqliteTable("Products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  thumbnail: text("thumbnail"),
  // al eliminar la categoria al que apunta , cambia automáticamente a null
  category_id: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  tag_id: text("tag_id", { mode: "json" }).$type<number[]>(),
  created_at: createdAt(),
});

export const categories = sqliteTable(
  "Categories",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    description: text("description").notNull(),
    created_at: createdAt(),
    // al eliminar la categoria al que apunta , cambia automáticamente a null
    category_id: integer("category_id"),
  },
  (table) => {
    return {
      // Declaración de la clave foránea apuntando a la misma tabla
      parentReference: foreignKey({
        columns: [table.category_id],
        foreignColumns: [table.id],
        name: "categories_parent_id_fkey", // Nombre opcional para la restricción
      }).onDelete("set null"), // Puedes añadir políticas como 'cascade' o 'set null'
    };
  },
);

export const tags = sqliteTable("Tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  created_at: createdAt(),
});

export const users = sqliteTable("Users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password_hash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  created_at: createdAt(),
});
