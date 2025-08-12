import { useInfiniteQuery } from "@tanstack/react-query";

import { txsMapper } from "../utils/txs";
import { fetchData } from "../utils/fetcher";

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
  const queryFn = ({ pageParam }: { pageParam: unknown }) => {
    const newParams = { ...params, cursor: pageParam };
    return fetchData<TData>(tx, newParams);
  };

  const query = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => lastPage.data?.nextCursor,

    ...options,
  });

  return query;
};
