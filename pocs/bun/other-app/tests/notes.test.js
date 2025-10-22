import { describe, it, expect, beforeEach } from "bun:test";
import { Database } from "bun:sqlite";
import { migrate, createNote, listNotes, getNote, updateNote, deleteNote } from "../src/notes.js";

describe("notes model", () => {
  let db;
  beforeEach(() => {
    db = new Database(":memory:");
    migrate(db);
  });

  it("creates and lists notes", () => {
    const a = createNote(db, "hello");
    const b = createNote(db, "world");
    const list = listNotes(db);
    expect(list.length).toBe(2);
    expect(list[0].text).toBe("world");
    expect(list[1].text).toBe("hello");
    expect(a.id).toBeDefined();
    expect(b.id).toBeDefined();
  });

  it("gets and updates a note", () => {
    const a = createNote(db, "foo");
    const fetched = getNote(db, a.id);
    expect(fetched.text).toBe("foo");
    const updated = updateNote(db, a.id, "bar");
    expect(updated.text).toBe("bar");
  });

  it("deletes a note", () => {
    const a = createNote(db, "temp");
    const ok = deleteNote(db, a.id);
    expect(ok).toBe(true);
    const missing = getNote(db, a.id);
    expect(missing).toBeNull();
  });
});

