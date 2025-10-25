"use client";

import {
  IconBuildingStore,
  IconTruckDelivery,
  IconShieldCheck,
} from "@tabler/icons-react";
import React from "react";

export default function AboutMobile() {
  return (
    <main className=" flex items-start justify-center p-4" dir="rtl">
      <section className=" bg-white rounded-2xl shadow-md p-5 ring-1 ring-zinc-100">
        <h1 className="text-lg font-semibold text-zinc-900 mb-2">درباره ما</h1>

        <p className="text-sm text-zinc-600 leading-6 mb-6">
          شرکت ما با مجوز رسمی فعالیت در حوزه واردات، توزیع و فروش عمده محصولات
          دخانی و لوازم جانبی، به‌عنوان یکی از تأمین‌کنندگان معتبر در سطح کشور
          شناخته می‌شود. تمرکز ما بر ارائه محصولات باکیفیت، قیمت رقابتی و خدمات
          سریع برای فروشگاه‌ها و عمده‌فروشان است.
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
            <div className="p-2 rounded-md bg-zinc-100">
              <IconBuildingStore size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-900">
                تأمین مطمئن و گسترده
              </h3>
              <p className="text-xs text-zinc-500 leading-5">
                با همکاری مستقیم با تولیدکنندگان داخلی و خارجی، شبکه‌ای گسترده
                از تأمین کالا برای فروشگاه‌ها و عمده‌فروشان ایجاد کرده‌ایم.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
            <div className="p-2 rounded-md bg-zinc-100">
              <IconTruckDelivery size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-900">
                ارسال سریع و قابل اطمینان
              </h3>
              <p className="text-xs text-zinc-500 leading-5">
                با بهره‌گیری از سیستم توزیع هوشمند، سفارش‌ها در کوتاه‌ترین زمان
                ممکن به سراسر کشور ارسال می‌شوند.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors">
            <div className="p-2 rounded-md bg-zinc-100">
              <IconShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-900">
                فعالیت قانونی و مجاز
              </h3>
              <p className="text-xs text-zinc-500 leading-5">
                تمامی فعالیت‌های شرکت تحت مجوز رسمی از نهادهای مربوطه انجام
                می‌شود و ما متعهد به رعایت قوانین و استانداردهای توزیع و فروش
                هستیم.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-6 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} شرکت پخش دخانیات — همکاری مطمئن برای
          عمده‌فروشان
        </footer>
      </section>
    </main>
  );
}
