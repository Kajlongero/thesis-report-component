import { useInfiniteQuery } from "@tanstack/react-query";

import { txsMapper } from "../utils/txs";
import { fetchData } from "../utils/fetcher";

import type { ApiCursorResponse } from "../types/api";

interface UseInfiniteApiQueryProps<TParams> {
  tx: keyof typeof txsMapper;
  fnName: string;
  params?: TParams;
  options?: object;
}

export const useInfiniteApiQuery = <TData, TParams = object>({
  tx,
  fnName,
  params,
  options,
}: UseInfiniteApiQueryProps<TParams>) => {
  const queryKey = [fnName];

  const queryFn = async ({
    pageParam,
  }: {
    pageParam: unknown;
  }): Promise<ApiCursorResponse<TData>> => {
    const newParams = { ...params, cursor: pageParam };
    const result = await fetchData<TData>(tx, newParams);
    return result as unknown as ApiCursorResponse<TData>;
  };

  const query = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    refetchOnMount: false,
    ...options,
  });

  return query;
};
