import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { SqlDatabase } from "@shared/database/sql-database";
import type { UserRepository } from "@/application/repository/user-repository";
import { User } from "@/domain/entity/user";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
  updated_at: Date;
};

const CREATE_USERS_TABLE = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "../database/schema.sql"),
  "utf8",
);

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly database: SqlDatabase) {}

  async ensureSchema(): Promise<void> {
    await this.database.query(CREATE_USERS_TABLE);
  }

  async save(user: User): Promise<void> {
    await this.database.query(
      `INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      this.toRow(user),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.query<UserRow>(
      `SELECT id, name, email, password_hash, role, created_at, updated_at
       FROM users
       WHERE email = $1`,
      [email.trim().toLowerCase()],
    );
    const row = result.rows[0];
    return row ? this.toUser(row) : null;
  }

  private toRow(user: User): unknown[] {
    return [
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    ];
  }

  private toUser(row: UserRow): User {
    return new User({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password_hash,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }
}
