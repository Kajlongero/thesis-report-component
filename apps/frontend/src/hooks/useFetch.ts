import type { ApiResponse } from "../types/api";
import { fetchData } from "../utils/fetcher";
import { txsMapper } from "../utils/txs";
import { useMutation } from "@tanstack/react-query";

type HookProps = {
  tx: keyof typeof txsMapper;
  fnName: string;
};

export const useFetch = (props: HookProps) => {
  const { tx, fnName } = props;

  const { data, error, isError, isPending, mutateAsync } = useMutation({
    mutationFn: (values: unknown) => fetchData(tx, values),
    mutationKey: [fnName],
  });

  const process = async <T>(data: unknown) => {
    const getData = await mutateAsync(data);

    return getData as ApiResponse<T>;
  };

  return {
    data,
    error,
    isError,
    isPending,

    process,
  };
};
