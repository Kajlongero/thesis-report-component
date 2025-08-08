import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "../context";

import { txsMapper } from "../utils/txs";
import { fetchData } from "../utils/fetcher";

import type { ApiResponse } from "../types/api";

type HookProps = {
  tx: keyof typeof txsMapper;
  fnName: string;
};

export const useFetch = (props: HookProps) => {
  const { setExpiredToken } = useContext(AuthContext);

  const { tx, fnName } = props;

  const { data, error, isError, isSuccess, status, isPending, mutateAsync } =
    useMutation({
      mutationKey: [fnName],
      mutationFn: (values: unknown) => fetchData(tx, values),
    });

  const process = async <T>(data: unknown) => {
    const getData = await mutateAsync(data);

    if (getData.message === "Token expired" && getData.statusCode === 401)
      setExpiredToken(true);

    return getData as ApiResponse<T>;
  };

  return {
    data,
    error,
    status,
    isError,
    isPending,
    isSuccess,

    process,
  };
};
