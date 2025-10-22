import { Database } from "bun:sqlite";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";
import { migrate } from "./notes.js";

const dataDir = join(process.cwd(), "var");
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(join(dataDir, "data.sqlite"));

// Ensure schema on startup
migrate(db);

