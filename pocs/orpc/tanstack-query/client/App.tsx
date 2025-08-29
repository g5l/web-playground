import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { appContract } from "../server/contract";

const client = createORPCClient(
  new RPCLink({ url: "http://localhost:3000/rpc" }),
  appContract
);

const orpc = createTanstackQueryUtils(client);

export default function App() {
  const query = useQuery(orpc.getMessage.queryOptions({ input: { name: "Gabriel" } }));

  if (query.isLoading) return <p>Loading...</p>;
  if (query.isError) return <p>Error: {(query.error as Error).message}</p>;

  return <h1>{query.data.message}</h1>;
}
