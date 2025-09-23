"use client";

import {
  IconChevronDown,
  IconHome,
  IconListDetails,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import { useGetShopOrdersListApi } from "@/utils/apis/shop/orders/GET/shopOrdersGetApi";
import { Separator } from "@/components/components/atoms/separator";
import Typography from "@/components/components/atoms/typography";
import { ChipProps } from "@/components/components/atoms/chip";
import { Button } from "@/components/components/atoms/button";
import { Chip } from "@/components/components/atoms/chip";
import { Card } from "@/components/components/atoms/card";
import { toPersianNumbers } from "@/lib/utils";
import Header from "@/app/_components/Header";
import { format } from "date-fns-jalali";
import { useState } from "react";

interface OrderStatusObj {
  [key: string]: {
    text: string;
    colorClass: ChipProps["variant"];
  };
}

const orderStatusObj: OrderStatusObj = {
  pending: {
    text: "در انتظار تایید",
    colorClass: "warning", // نارنجی/زرد برای انتظار
  },
  confirmed: {
    text: "تایید شده",
    colorClass: "primary", // زرد برای تایید
  },
  processing: {
    text: "در حال پردازش",
    colorClass: "info", // آبی برای پردازش
  },
  shipped: {
    text: "ارسال شده",
    colorClass: "secendery", // خاکستری تیره برای ارسال
  },
  delivered: {
    text: "تحویل شده",
    colorClass: "success", // سبز برای تحویل موفق
  },
  cancelled: {
    text: "لغو شده",
    colorClass: "danger", // قرمز برای لغو
  },
};

const OrdersPage = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: number, orderCreatedAt: string) => {
    const uniqueKey = `${orderId}-${orderCreatedAt}`;
    setOpenOrderDetails(openOrderDetails === uniqueKey ? null : uniqueKey);
  };
  const shopOrderListQuery = useGetShopOrdersListApi();

  return (
    <>
      <div className="flex px-4 pt-28  flex-col gap-4 page-container page-with-bottom-nav">
        <Header title="سفارشات من" />

        {/* Use the new Header component */}

        {shopOrderListQuery.data?.length ? (
          shopOrderListQuery.data?.map((order) => (
            <div key={`order-${order.id}-${order.created_at}`}>
              {/* Order Card */}
              <Card className="bg-maincard rounded-lg p-4">
                {/* Order Header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-2 items-center text-gray-400 text-sm">
                    <Chip
                      variant={orderStatusObj[order.status].colorClass}
                      size="sm"
                      className="ml-2"
                    >
                      {orderStatusObj[order.status].text}
                    </Chip>
                    {toPersianNumbers(format(order.created_at, "yyyy/MM/dd"))}
                  </div>
                  <div className="font-medium">
                    سفارش #{toPersianNumbers(order.id)}
                  </div>
                </div>

                {/* Order Price */}
                <div className="text-right mb-3 " dir="rtl">
                  <Typography variant="label/md" weight="bold">
                    {toPersianNumbers(order.total_amount)}
                    <span className="text-gray-400 px-2">تومان</span>
                  </Typography>
                </div>

                {/* Order Status Buttons */}
                {!!order.items.length && (
                  <div dir="rtl" className="grid grid-cols-4 gap-1 mb-3">
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
                {openOrderDetails === `${order.id}-${order.created_at}` &&
                  !!order.items.length && (
                    <>
                      <Separator className="my-2 bg-gray-700" />
                      <div className="pt-2">
                        <div className="grid grid-cols-1 gap-2">
                          {order.items.map((item) => (
                            <div
                              className="flex justify-between"
                              key={item.id + item.product.name}
                            >
                              <Typography variant="paragraph/sm">
                                {item.product.name} × {item.quantity}
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
                    </>
                  )}

                {/* Order Details Toggle */}
                <div
                  className="flex justify-center items-center gap-1 mt-1 cursor-pointer text-gray-400"
                  onClick={() => toggleOrderDetails(order.id, order.created_at)}
                >
                  <IconChevronDown
                    size={18}
                    className={`transition-transform ${
                      openOrderDetails === `${order.id}-${order.created_at}`
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
    </>
  );
};

export default OrdersPage;
