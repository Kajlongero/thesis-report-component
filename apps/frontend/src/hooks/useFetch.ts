import { useMutation } from "@tanstack/react-query";

import { txsMapper } from "../utils/txs";
import { fetchData } from "../utils/fetcher";

import type { ApiResponse } from "../types/api";

type HookProps = {
  tx: keyof typeof txsMapper;
  fnName: string;
};

export const useFetch = (props: HookProps) => {
  const { tx, fnName } = props;

  const { mutateAsync, ...rest } = useMutation({
    mutationKey: [fnName],
    mutationFn: (values: unknown) => fetchData(tx, values),
  });

  const process = async <T>(data: unknown) => {
    const getData = await mutateAsync(data);

    return getData as ApiResponse<T>;
  };

  return {
    rest,

    process,
  };
};
