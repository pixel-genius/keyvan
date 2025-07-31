import { coreApi } from "@/utils/service/instance";
import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import path from "path";

interface Params {
  category?: number;
  brand?: number;
  search?: string;
}

interface ProductsListApiResponse {
  id: number;
  name: string;
  description: string | null;
  image: URL | null | string;
  created_at: Date;
  is_active: boolean;
  latest_price: number;
  price_history: {
    id: number;
    price: number;
    created_at: Date;
  }[];
}

const getProductsListApi = async (
  params: Params
): Promise<ProductsListApiResponse> => {
  const response = await coreApi.get(path.join("/shop/products/"), {
    params,
  });
  return response.data;
};

export const UseGetShopProductList = (props?: {
  params?: Params;
  options?: Partial<
    DefinedInitialDataOptions<
      ProductsListApiResponse,
      any,
      ProductsListApiResponse,
      QueryKey
    >
  >;
}) => {
  const query = useQuery({
    queryKey: ["getShopProductList", props?.params],
    queryFn: () => getProductsListApi(props?.params || {}),
    ...props?.options,
  });

  return query;
};
