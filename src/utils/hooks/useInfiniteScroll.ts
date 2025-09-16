import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const useInfiniteScroll = <TData>(
  listQuery: UseInfiniteQueryResult<TData, unknown>,
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          listQuery.hasNextPage &&
          !listQuery.isFetchingNextPage
        ) {
          listQuery.fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [
    listQuery.fetchNextPage,
    listQuery.hasNextPage,
    listQuery.isFetchingNextPage,
  ]);
  return { observerRef };
};

export { useInfiniteScroll };
