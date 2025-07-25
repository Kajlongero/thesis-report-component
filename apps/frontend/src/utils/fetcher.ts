import { txsMapper } from "./txs";

import type { ApiResponse } from "../types/api";

export const fetchData = async <T>(
  tx: keyof typeof txsMapper,
  body: unknown = undefined
) => {
  const data = await fetch(`http://localhost:3000/process`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx: txsMapper[tx],
      params: JSON.stringify(body ? body : {}),
    }),
  });

  const response = (await data.json()) as ApiResponse<T>;

  return response;
};
