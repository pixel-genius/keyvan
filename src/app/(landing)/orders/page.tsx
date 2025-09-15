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
import { Button } from "@/components/components/atoms/button";
import { Chip } from "@/components/components/atoms/chip";
import { Card } from "@/components/components/atoms/card";
import { toPersianNumbers } from "@/lib/utils";
import Header from "@/app/_components/Header";
import { useState } from "react";

const OrdersPage = () => {
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const toggleOrderDetails = () => {
    setOrderDetailsOpen(!orderDetailsOpen);
  };
  const shopOrderListQuery = useGetShopOrdersListApi();

  return (
    <>
      <Header title="سفارشات" />
      <div dir="rtl" className="flex px-4 pt-28  flex-col gap-4 ">
        {/* Use the new Header component */}

        {shopOrderListQuery.data?.length ? (
          shopOrderListQuery.data?.map((order) => (
            <div key={order.id + order.items.toString()}>
              {/* Order Card */}
              <Card className="bg-maincard rounded-lg p-4">
                {/* Order Header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-400 text-sm">
                    <Chip variant="secendery" size="sm" className="ml-2">
                      {order.status}
                    </Chip>
                    {order.created_at}
                  </div>
                  <div className="font-medium">سفارش #{order.id}</div>
                </div>

                {/* Order Price */}
                <div className="text-right mb-3">
                  <Typography variant="label/md" weight="bold">
                    {toPersianNumbers(order.total_amount)} تومان
                  </Typography>
                </div>

                {/* Order Status Buttons */}
                {!!order.items.length && (
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {order.items?.map((item) => (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-md py-1 text-xs"
                        key={item.id + item.product.name}
                      >
                        {item.product.name} × {item.quantity}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Order Details */}
                {orderDetailsOpen && !!order.items.length && (
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
                  onClick={toggleOrderDetails}
                >
                  <IconChevronDown
                    size={18}
                    className={`transition-transform ${
                      orderDetailsOpen ? "rotate-180" : ""
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
