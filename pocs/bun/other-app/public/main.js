const listEl = document.getElementById("list");
const inputEl = document.getElementById("noteText");
const addBtn = document.getElementById("addBtn");
const refreshBtn = document.getElementById("refresh");
const statusEl = document.getElementById("status");

async function fetchNotes() {
  const res = await fetch("/api/notes");
  const data = await res.json();
  render(data.notes || []);
}

function fmtDate(iso) {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

function render(notes) {
  listEl.innerHTML = "";
  for (const n of notes) {
    const li = document.createElement("li");
    const left = document.createElement("div");
    left.className = "left";
    const text = document.createElement("div");
    text.className = "text";
    text.textContent = n.text;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `#${n.id} • ${fmtDate(n.created_at)}`;
    left.append(text, meta);

    const actions = document.createElement("div");
    actions.className = "actions";
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = async () => {
      await fetch(`/api/notes/${n.id}`, { method: "DELETE" });
      await fetchNotes();
    };
    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.onclick = async () => {
      const t = prompt("New text", n.text);
      if (!t || t === n.text) return;
      await fetch(`/api/notes/${n.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: t }) });
      await fetchNotes();
    };
    actions.append(edit, del);

    li.append(left, actions);
    listEl.append(li);
  }
}

addBtn.onclick = async () => {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";
  await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  await fetchNotes();
};

refreshBtn.onclick = fetchNotes;

function connectWS() {
  try {
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${proto}://${location.host}/ws`);
    ws.onopen = () => { statusEl.textContent = "WebSocket: connected"; };
    ws.onclose = () => { statusEl.textContent = "WebSocket: closed"; };
    ws.onerror = () => { statusEl.textContent = "WebSocket: error"; };
    ws.onmessage = async (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (["created", "updated", "deleted"].includes(msg.type)) {
          // refresh on changes broadcasted from server
          await fetchNotes();
        }
      } catch {}
    };
  } catch (e) {
    statusEl.textContent = "WebSocket unsupported";
  }
}

await fetchNotes();
connectWS();

