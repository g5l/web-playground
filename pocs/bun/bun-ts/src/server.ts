import { serve } from "bun";
import { healthHandler } from "@/routes/health";
import { sum } from "@/utils/sum";
import { greet } from "@/lib/greeter"

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cjsMath = require("./cjs/math.cjs") as { mul: (a: number, b: number) => number };

const PORT = Number(process.env.PORT ?? 3000);

const router = async (req: Request): Promise<Response> => {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname === "/") {
    const a = Number(searchParams.get("a") ?? 2);
    const b = Number(searchParams.get("b") ?? 40);
    const total = sum(a, b);
    const multiplication = cjsMath.mul(a, b);
    const body = {
      message: greet("Bun + TypeScript"),
      sum: { a, b, total },
      multiplication,
      runtime: "bun",
      tsPathsWorking: true
    };
    return json(body);
  }

  if (pathname === "/health") {
    return healthHandler();
  }

  return new Response("Not found", { status: 404 });
};

serve({
  port: PORT,
  fetch: router,
});

function json(data: unknown) {
  return new Response(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
