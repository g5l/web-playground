const register = require("react-server-dom-webpack/node-register");
register();

const babelRegister = require("@babel/register");
const path = require("path");
const { readFileSync } = require("fs");

babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: ["@babel/transform-modules-commonjs"],
});

const { renderToPipeableStream } = require("react-server-dom-webpack/server");
const express = require("express");

const React = require("react");
const ReactApp = require("../src/components/App.server.jsx").default;
const { calculateTax } = require("../src/data/taxData.js");

const app = express();

app.get("/", (req, res) => {
  const html = readFileSync(
    path.resolve(__dirname, "../public/index.html"),
    "utf8"
  );
  res.send(html);
});

app.get("/react", (req, res) => {
  const manifest = readFileSync(
    path.resolve(__dirname, "../public/react-client-manifest.json"),
    "utf8"
  );
  const moduleMap = JSON.parse(manifest);

  let calculationResult = null;
  try {
    const { productId, stateCode, year, quantity } = req.query || {};
    if (productId && stateCode && year && quantity) {
      const parsedYear = parseInt(year, 10);
      const parsedQty = parseInt(quantity, 10);
      if (!Number.isNaN(parsedYear) && !Number.isNaN(parsedQty)) {
        calculationResult = calculateTax(productId, stateCode, parsedYear, parsedQty);
      }
    }
  } catch (e) {
    // If calculation fails, keep result null and continue rendering
  }

  const { pipe } = renderToPipeableStream(
    React.createElement(ReactApp, { calculationResult }),
    moduleMap
  );
  pipe(res);
});

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);
