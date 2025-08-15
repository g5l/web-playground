const { execSync } = require("child_process");
const fs = require("fs");

function run(cmd) {
  const start = Date.now();
  execSync(cmd, { stdio: "inherit" });
  return (Date.now() - start) / 1000;
}

function size(file) {
  return (fs.statSync(file).size / 1024).toFixed(2) + " KB";
}

console.log("== Parcel ==");
let t = run("cd parcel && npm run build");
console.log("Build time:", t, "s");
console.log("Bundle size:", size("parcel/dist/index.js"));

console.log("== Webpack ==");
t = run("cd webpack && npm run build");
console.log("Build time:", t, "s");
console.log("Bundle size:", size("webpack/dist/bundle.js"));

console.log("== Rollup ==");
t = run("cd rollup && npm run build");
console.log("Build time:", t, "s");
console.log("Bundle size:", size("rollup/dist/bundle.js"));
