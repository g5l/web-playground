const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

const WORKING_DIR = path.join(__dirname, "workspace");

app.use(cors());
app.use(express.json());

fs.ensureDirSync(WORKING_DIR);

app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (!command) return res.status(400).json({ error: "No command provided" });

  const [cmd, ...args] = command.split(" ");
  let result = "";

  switch (cmd) {
    case "ls":
      result = fs.readdirSync(WORKING_DIR).join("\n");
      break;
    case "mkdir":
      fs.ensureDirSync(path.join(WORKING_DIR, args[0]));
      result = `Created directory: ${args[0]}`;
      break;
    case "touch":
      fs.writeFileSync(path.join(WORKING_DIR, args[0]), "");
      result = `Created file: ${args[0]}`;
      break;
    case "echo":
      result = args.join(" ");
      break;
    case "cd":
      const newDir = path.resolve(WORKING_DIR, args[0]);
      if (fs.existsSync(newDir)) {
        result = `Changed directory to ${args[0]}`;
      } else {
        result = `Directory not found: ${args[0]}`;
      }
      break;
    case "cat":
      try {
        result = fs.readFileSync(path.join(WORKING_DIR, args[0]), "utf8");
      } catch {
        result = `Cannot read file: ${args[0]}`;
      }
      break;
    default:
      result = "Command not recognized.";
  }

  res.json({ output: result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});