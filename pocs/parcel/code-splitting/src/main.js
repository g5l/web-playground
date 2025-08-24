const output = document.getElementById("output");
const btn = document.getElementById("loadBtn");

btn.addEventListener("click", async () => {
  // Dynamic import (creates a separate bundle automatically)
  const { bigModule } = await import("./bigModule.js");
  output.innerHTML = bigModule();
});
