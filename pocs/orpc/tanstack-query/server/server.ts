import express from "express";
import { os, createORPCRouter } from "@orpc/server";
import { appContract } from "./contract";

const router = createORPCRouter({
  getMessage: os.input(appContract.getMessage.input).handler(({ input }) => {
    return { message: `Hello, ${input.name}!` };
  }),
});

const app = express();
app.use(express.json());
app.use("/rpc", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 oRPC server listening at http://localhost:${PORT}/rpc`);
});
