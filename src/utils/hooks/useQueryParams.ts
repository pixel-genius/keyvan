import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePathUrl = (params) => {
    router.push(pathname + "?" + params.toString());
  };
  const setParams = useCallback(
    (name: string, value: string | boolean | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());
      updatePathUrl(params);
    },
    [searchParams],
  );

  const removeParams = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      updatePathUrl(params);
    },
    [searchParams],
  );

  return { pathname, setParams, router, searchParams, removeParams };
};

export default useQueryParams;
