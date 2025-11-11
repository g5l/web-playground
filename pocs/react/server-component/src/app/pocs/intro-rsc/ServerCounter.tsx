import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function ServerCounter() {
  const cookieStore = await cookies();
  const current = Number.parseInt(cookieStore.get("count")?.value ?? "0");
  const count = Number.isNaN(current) ? 0 : current;

  async function increment() {
    "use server";
    const c = await cookies();
    const value = Number.parseInt(c.get("count")?.value ?? "0");
    const next = Number.isNaN(value) ? 1 : value + 1;
    c.set("count", String(next), { path: "/" });
    revalidatePath("/pocs/intro-rsc");
  }

  async function reset() {
    "use server";
    const c = await cookies();
    c.set("count", "0", { path: "/" });
    revalidatePath("/pocs/intro-rsc");
  }

  return (
    <section className="card">
      <h3>ClientCounter (Server Component + Action)</h3>
      <p>Count: {count}</p>
      <form action={increment} style={{ display: "inline" }}>
        <button className="btn" type="submit">Increment</button>
      </form>
      <form action={reset} style={{ display: "inline", marginLeft: 8 }}>
        <button className="btn" type="submit">Reset</button>
      </form>
    </section>
  );
}
