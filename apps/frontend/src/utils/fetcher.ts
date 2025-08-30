import { txsMapper } from "./txs";

import type { ApiResponse } from "../types/api";
import { BASE_API_URL } from "../config/api";

export const fetchData = async <T>(
  tx: keyof typeof txsMapper,
  body: unknown = undefined
) => {
  const data = await fetch(BASE_API_URL, {
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

export const fetchDownloadReport = async (
  tx: keyof typeof txsMapper,
  body: unknown = undefined
) => {
  const data = await fetch(BASE_API_URL, {
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

  if (!data.ok) throw new Error(data.statusText);

  const blob = await data.blob();
  const url = URL.createObjectURL(blob);

  return { blob, url };
};
