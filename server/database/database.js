import "dotenv/config";
import { hashPassword } from "../utils/passwordHashing.js";

const ADMIN_PASSWORD = await hashPassword(
  process.env.ADMIN_PASSWORD ?? "admin",
);

import db from "./connection.js";

const deleteMode = process.argv.includes("--delete");

if (deleteMode) {
  db.exec("DROP TABLE IF EXISTS users");
}

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        username VARCHAR(80) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(60) NOT NULL
    );
`);

if (deleteMode) {
  db.prepare(
    "INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
  ).run("admin", ADMIN_PASSWORD, "admin@test.dk", "Admin", "Admin");
}
