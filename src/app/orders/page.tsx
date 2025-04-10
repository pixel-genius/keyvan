'use client';

import { useState } from 'react';
import Typography from "@/components/components/atoms/typography";
import { 
  IconChevronDown, 
  IconChevronRight, 
  IconUser, 
  IconListDetails, 
  IconShoppingBag, 
  IconHome,
  IconChevronLeft
} from "@tabler/icons-react";
import { Button } from "@/components/components/atoms/button";
import { Card } from "@/components/components/atoms/card";
import { Chip } from "@/components/components/atoms/chip";
import { Separator } from "@/components/components/atoms/separator";
import Header from '../_components/Header';

const OrdersPage = () => {
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const toggleOrderDetails = () => {
    setOrderDetailsOpen(!orderDetailsOpen);
  };

  return (
    <>
      <Header title="سفارشات" />
        <div dir="rtl" className="flex flex-col gap-4 pt-8">
        {/* Use the new Header component */}
        

        {/* Order Card */}
        <Card className="bg-maincard rounded-lg p-4">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-2">
            <div className="text-gray-400 text-sm">
                <Chip variant="secendery" size="sm" className="ml-2">درحال بررسی</Chip>
                ۲۵ بهمن ۱۴۰۲
            </div>
            <div className="font-medium">سفارش #۴۳۹۶۴</div>
            </div>

            {/* Order Price */}
            <div className="text-right mb-3">
            <Typography variant="label/md" weight="bold">۸۰۰,۰۰۰ تومان</Typography>
            </div>
            
            {/* Order Status Buttons */}
            <div className="grid grid-cols-4 gap-1 mb-3">
            <Button variant="secondary" size="sm" className="rounded-md py-1 text-xs">
                ستونی ۳×
            </Button>
            <Button variant="secondary" size="sm" className="rounded-md py-1 text-xs">
                کمل ۳×
            </Button>
            <Button variant="secondary" size="sm" className="rounded-md py-1 text-xs">
                وینستون ۳×
            </Button>
            <Button variant="secondary" size="sm" className="rounded-md py-1 text-xs">
                پانامال ۳×
            </Button>
            </div>

            {/* Order Details */}
            {orderDetailsOpen && (
            <>
                <Separator className="my-2 bg-gray-700" />
                <div className="pt-2">
                <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between">
                    <Typography variant="paragraph/sm">۱. کمل کاپیکت نقره ای ۳×</Typography>
                    <Typography variant="paragraph/sm" className="text-gray-300">۲۰۰,۰۰۰ تومان</Typography>
                    </div>
                    <div className="flex justify-between">
                    <Typography variant="paragraph/sm">۲. کمل کاپیکت آبی کوپن×۵</Typography>
                    <Typography variant="paragraph/sm" className="text-gray-300">۲۰۰,۰۰۰ تومان</Typography>
                    </div>
                    <div className="flex justify-between">
                    <Typography variant="paragraph/sm">۳. کمل نقره ای کلیک۷×</Typography>
                    <Typography variant="paragraph/sm" className="text-gray-300">۲۰۰,۰۰۰ تومان</Typography>
                    </div>
                    <div className="flex justify-between">
                    <Typography variant="paragraph/sm">۴. کمل مشکی کلیک جدید×۱</Typography>
                    <Typography variant="paragraph/sm" className="text-gray-300">۲۰۰,۰۰۰ تومان</Typography>
                    </div>
                </div>
                </div>
            </>
            )}
            
            {/* Order Details Toggle */}
            <div 
            className="flex justify-center items-center gap-1 mt-1 cursor-pointer text-gray-400"
            onClick={toggleOrderDetails}
            >
            <IconChevronDown size={18} className={`transition-transform ${orderDetailsOpen ? 'rotate-180' : ''}`} />
            <Typography variant="paragraph/xs" className="text-gray-400">جزئیات سفارش</Typography>
            </div>
        </Card>

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
            <Typography variant="paragraph/xs" className="text-primary">سفارشات</Typography>
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