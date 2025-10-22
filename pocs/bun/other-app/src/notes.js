// Notes model and helpers using bun:sqlite (no external deps)

/**
 * Schema:
 *   notes(id INTEGER PRIMARY KEY AUTOINCREMENT,
 *         text TEXT NOT NULL,
 *         created_at TEXT NOT NULL)
 */

export function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

export function listNotes(db) {
  return db
    .query("SELECT id, text, created_at FROM notes ORDER BY id DESC")
    .all();
}

export function getNote(db, id) {
  return db
    .query("SELECT id, text, created_at FROM notes WHERE id = ?")
    .get(id) || null;
}

export function createNote(db, text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    throw new Error("text is required");
  }
  const createdAt = new Date().toISOString();
  const info = db
    .query("INSERT INTO notes (text, created_at) VALUES (?, ?)")
    .run(text.trim(), createdAt);
  const id = Number(info?.lastInsertRowid ?? 0);
  return getNote(db, id);
}

export function updateNote(db, id, text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    throw new Error("text is required");
  }
  const info = db
    .query("UPDATE notes SET text = ? WHERE id = ?")
    .run(text.trim(), id);
  if (!info || info.changes === 0) return null;
  return getNote(db, id);
}

export function deleteNote(db, id) {
  const info = db.query("DELETE FROM notes WHERE id = ?").run(id);
  return info?.changes > 0;
}

