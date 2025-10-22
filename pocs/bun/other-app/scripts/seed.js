import { db } from "../src/db.js";
import { createNote, listNotes } from "../src/notes.js";

createNote(db, "Welcome to Bun Notes POC ✨");
createNote(db, "This data is stored in SQLite");
createNote(db, "Edit or delete me from the UI");

console.log("Seeded notes:");
console.table(listNotes(db));

