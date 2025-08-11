import { useQuery } from "@tanstack/react-query";

import type { txsMapper } from "../utils/txs";
import { fetchData } from "../utils/fetcher";

interface UseFetchQueryProps<TParams> {
  tx: keyof typeof txsMapper;
  fnName: string;

  params?: TParams;
  options?: object;
}

export const useFetchQuery = <TData, TParams = object>({
  tx,
  fnName,
  params,
  options,
}: UseFetchQueryProps<TParams>) => {
  const queryKey = [fnName];
  const queryFn = () => fetchData<TData>(tx, params);

  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
};
