import React, { useEffect, useId } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteApiQuery } from "../../hooks/useInfinityFetchQuery";
import type { txsMapper } from "../../utils/txs";

type Props<TItem> = {
  tx: keyof typeof txsMapper;
  fnName: string;
  params?: Record<string, unknown>;

  component: React.ComponentType<TItem>;
  emptyComponent?: React.ReactNode;
};

export const InfiniteScrollContainer = <TItem extends { id: number }>({
  tx,
  fnName,
  params,
  component: ItemComponent,
}: Props<TItem>) => {
  const id = useId();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteApiQuery<TItem>({
      tx,
      fnName,
      params,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center min-h-56">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
      </div>
    );

  const hasData = data && data.pages?.[0]?.data?.length > 0;

  return (
    <div className="space-y-4">
      {hasData ? (
        data.pages.map((page, i) => (
          <React.Fragment key={`${fnName}-${i}-${id}`}>
            {page.data?.map((item, idx) => (
              <ItemComponent key={`${fnName}-${id}-${idx}`} {...item} />
            ))}
          </React.Fragment>
        ))
      ) : (
        <p className="text-center text-muted-foreground">No hay resultados.</p>
      )}

      <div
        ref={ref}
        className="flex flex-1 justify-center items-center h-20 w-full"
      >
        {isFetchingNextPage ? (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
        ) : !hasNextPage && hasData ? (
          <p className="text-center text-sm text-muted-foreground">
            Has llegado al final.
          </p>
        ) : null}
      </div>
    </div>
  );
};
