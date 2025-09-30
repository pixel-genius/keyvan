"use client";

import {
  IconChevronDown,
  IconHome,
  IconListDetails,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useGetShopOrdersListApi } from "@/utils/apis/shop/orders/GET/shopOrdersGetApi";
import { Chip, ChipProps } from "@/components/components/atoms/chip";
import { Separator } from "@/components/components/atoms/separator";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { Button } from "@/components/components/atoms/button";
import { Card } from "@/components/components/atoms/card";
import { toPersianNumbers } from "@/lib/utils";
import Header from "@/app/_components/Header";
import { useEffect, useState } from "react";
import { format } from "date-fns-jalali";
import "./styles.css";

interface OrderStatusObj {
  [key: string]: {
    text: string;
    colorClass: ChipProps["variant"];
  };
}

const orderStatusObj: OrderStatusObj = {
  pending: {
    text: "در انتظار تایید",
    colorClass: "warning",
  },
  confirmed: {
    text: "تایید شده",
    colorClass: "success",
  },
  processing: {
    text: "در حال پردازش",
    colorClass: "secendery",
  },
  shipped: {
    text: "ارسال شده",
    colorClass: "info",
  },
  delivered: {
    text: "تحویل شده",
    colorClass: "info",
  },
  cancelled: {
    text: "لغو شده",
    colorClass: "danger",
  },
};

interface OrderDetailsState {
  id: number;
  open: boolean;
}

const OrdersPage = () => {
  const shopOrderListQuery = useGetShopOrdersListApi();
  const [orderDetailsOpen, setOrderDetailsOpen] = useState<OrderDetailsState[]>(
    [],
  );

  useEffect(() => {
    if (shopOrderListQuery.data?.length) {
      setOrderDetailsOpen((prev) => [
        ...prev,
        ...shopOrderListQuery.data.map((order) => ({
          id: order.id,
          open: false,
        })),
      ]);
    }
  }, [shopOrderListQuery.data]);

  return (
    <div className="mt-2">
      <Header title="سفارشات" />
      <div className="flex flex-col order-container gap-4 mt-2 overflow-y-auto">
        {/* Use the new Header component */}
        {shopOrderListQuery.isFetching ? (
          [...Array(2)].map((_, index) => (
            <Card
              key={"order-item-" + index}
              className="bg-maincard rounded-lg p-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center text-gray-400 text-sm">
                  <Skeleton className="w-30 h-10" />
                  <Skeleton className="w-30 h-5" />
                </div>
                <div className="font-medium">
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>

              {/* Order Price */}
              <div className="text-right" dir="rtl">
                <Skeleton className="w-36 h-5 mb-2" />
                <Skeleton className="w-36 h-5" />
              </div>
              <div dir="rtl">
                <Skeleton className="w-10 h-5 mb-1" />
                <Skeleton className="w-full h-5" />
              </div>
              {/* Order Status Buttons */}
              <div dir="rtl" className="flex flex-wrap gap-1">
                <Skeleton className="w-30 h-9" />
                <Skeleton className="w-30 h-9" />
                <Skeleton className="w-30 h-9" />
              </div>
            </Card>
          ))
        ) : shopOrderListQuery.data?.length ? (
          shopOrderListQuery.data?.map((order) => (
            <div key={order.id + order.items.toString()}>
              {/* Order Card */}
              <Card className="bg-maincard rounded-lg p-4">
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center text-gray-400 text-sm">
                    <Chip
                      variant={orderStatusObj[order.status].colorClass}
                      size="sm"
                      className="ml-2 inline-flex"
                    >
                      {orderStatusObj[order.status].text}
                    </Chip>
                    {toPersianNumbers(format(order.created_at, "yyyy/MM/dd"))}
                  </div>
                  <div className="font-medium">
                    درخواست #{toPersianNumbers(order.id)}
                  </div>
                </div>

                {/* Order Price */}
                <div className="text-right">
                  <Typography variant="label/md" weight="bold">
                    کل مبلغ خرید : {toPersianNumbers(order.total_buy_amount)}{" "}
                    تومان
                  </Typography>
                  <Typography variant="label/md" weight="bold">
                    کل مبلغ فروش : {toPersianNumbers(order.total_sell_amount)}{" "}
                    تومان
                  </Typography>
                </div>
                {order.address && (
                  <div dir="rtl">
                    <Typography variant="label/sm">آدرس :</Typography>
                    <Typography variant="paragraph/sm">
                      {order.address.text}
                    </Typography>
                  </div>
                )}
                {/* Order Status Buttons */}
                {!!order.items.length && (
                  <div dir="rtl" className="flex flex-wrap gap-1">
                    {order.items?.map((item) => (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-md py-1 text-xs w-fit"
                        key={item.id + item.product.name}
                      >
                        {item.product.name} × {item.quantity}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Order Details */}
                {orderDetailsOpen.find((item) => item.id === order.id)?.open &&
                  !!order.items.length && (
                    <div dir="rtl">
                      <Separator className="my-2 bg-gray-700" />
                      <div>
                        <Typography variant="label/lg">کالا ها :</Typography>
                        <div className="pt-2">
                          <div className="grid grid-cols-1 gap-2">
                            {order.items.map((item) => (
                              <div
                                className="flex justify-between"
                                key={item.id + item.product.name}
                              >
                                <Typography
                                  variant="paragraph/sm"
                                  className="whitespace-pre-line max-w-[79%]"
                                >
                                  {item.product.name} × {item.quantity}
                                  <Chip
                                    className="hover:bg-red-600 !cursor-default !py-0 h-fit rounded-xs mr-2 text-xs"
                                    variant={
                                      item.order_type === "buy"
                                        ? "success"
                                        : "danger"
                                    }
                                  >
                                    {item.order_type === "buy"
                                      ? "خرید"
                                      : "فروش"}
                                  </Chip>
                                </Typography>
                                <Typography
                                  variant="paragraph/sm"
                                  className="text-gray-300"
                                >
                                  {toPersianNumbers(item.total_price)} تومان
                                </Typography>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {order.notes ? (
                        <>
                          <Separator className="my-2 bg-gray-700" />
                          <div>
                            <Typography variant="label/lg">
                              یادداشت :
                            </Typography>
                            <Typography>{order.notes}</Typography>
                          </div>
                        </>
                      ) : null}
                    </div>
                  )}

                {/* Order Details Toggle */}
                <div
                  className="flex justify-center items-center gap-1 mt-1 cursor-pointer text-gray-400"
                  onClick={() => {
                    setOrderDetailsOpen((prev) => [
                      ...prev.map((item) =>
                        item.id === order.id
                          ? { id: item.id, open: !item.open }
                          : item,
                      ),
                    ]);
                  }}
                >
                  <IconChevronDown
                    size={18}
                    className={`transition-transform ${
                      orderDetailsOpen.find((item) => item.id === order.id)
                        ?.open
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                  <Typography variant="paragraph/xs" className="text-gray-400">
                    جزئیات سفارش
                  </Typography>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Typography variant="label/md" weight="normal">
              سفارشی یافت نشد
            </Typography>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="fixed bottom-0 left-0 w-full bg-maincard p-3 flex justify-around">
          <div className="flex flex-col items-center text-gray-400">
            <IconUser size={24} />
            <Typography variant="paragraph/xs">حساب کاربری</Typography>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <IconShoppingBag size={24} />
            <Typography variant="paragraph/xs">محصولات</Typography>
          </div>
          <div className="flex flex-col items-center text-primary">
            <IconListDetails size={24} />
            <Typography variant="paragraph/xs" className="text-primary">
              سفارشات
            </Typography>
          </div>
          <div className="flex flex-col items-center text-gray-400">
            <IconHome size={24} />
            <Typography variant="paragraph/xs">خانه</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
