import { db } from "./db.js";
import {
  listNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "./notes.js";

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

async function readJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export async function handleApi(req, url, server) {
  const { pathname, searchParams } = url;
  const method = req.method.toUpperCase();

  if (pathname === "/api/health") return json({ ok: true });
  if (pathname === "/api/time") return json({ now: new Date().toISOString() });

  if (pathname === "/api/notes" && method === "GET") {
    return json({ notes: listNotes(db) });
  }
  if (pathname === "/api/notes" && method === "POST") {
    const body = await readJson(req);
    if (!body || typeof body.text !== "string") return json({ error: "text required" }, { status: 400 });
    const note = createNote(db, body.text);
    try { server?.publish?.("notes", JSON.stringify({ type: "created", note })); } catch {}
    return json(note, { status: 201 });
  }

  // /api/notes/:id
  const match = pathname.match(/^\/api\/notes\/(\d+)$/);
  if (match) {
    const id = Number(match[1]);
    if (Number.isNaN(id)) return json({ error: "invalid id" }, { status: 400 });

    if (method === "GET") {
      const note = getNote(db, id);
      return note ? json(note) : json({ error: "not found" }, { status: 404 });
    }
    if (method === "PUT" || method === "PATCH") {
      const body = await readJson(req);
      if (!body || typeof body.text !== "string") return json({ error: "text required" }, { status: 400 });
      const note = updateNote(db, id, body.text);
      if (!note) return json({ error: "not found" }, { status: 404 });
      try { server?.publish?.("notes", JSON.stringify({ type: "updated", note })); } catch {}
      return json(note);
    }
    if (method === "DELETE") {
      const ok = deleteNote(db, id);
      if (!ok) return json({ error: "not found" }, { status: 404 });
      try { server?.publish?.("notes", JSON.stringify({ type: "deleted", id })); } catch {}
      return json({ ok: true });
    }
  }

  // Not an API route
  return null;
}

