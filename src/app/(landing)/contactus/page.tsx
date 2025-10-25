"use client";

import {
  IconPhone,
  IconMapPin,
  IconBrandTelegram,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import React from "react";

export default function ContactMobile() {
  // جایگزین کنید: مقادیر زیر را با اطلاعات واقعی خود عوض کنید
  const phone = "(+98) 9XX XXX XXXX";
  const address = "تهران — خیابان مثال، پلاک ۱۲۳";
  const telegram = "https://t.me/your_username"; // یا t.me/your_username
  const whatsapp = "https://wa.me/98XXXXXXXXXX"; // شماره بدون 0 و با کد کشور
  const instagram = "https://instagram.com/your_username";

  return (
    <main className=" flex items-start justify-center   p-4" dir="rtl">
      <section className="w-full  bg-white text-right rounded-2xl  p-5 ring-1 ring-zinc-100">
        <h1 className="text-lg font-semibold text-zinc-900 mb-1">تماس با ما</h1>
        <p className="text-sm text-zinc-500 mb-4">
          خوشحال می‌شویم از شما بشنویم — برای تماس یکی از گزینه‌ها را انتخاب
          کنید.
        </p>

        {/* شماره تماس */}
        <a
          href={`tel:${phone.replace(/[^+0-9]/g, "")}`}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors"
        >
          <div className="p-2 rounded-md bg-zinc-100">
            <IconPhone size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-900">تلفن</div>
            <div className="text-xs text-zinc-500">{phone}</div>
          </div>
        </a>

        {/* آدرس */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors mt-1">
          <div className="p-2 rounded-md bg-zinc-100">
            <IconMapPin size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-900">آدرس</div>
            <div className="text-xs text-zinc-500">{address}</div>
          </div>
        </div>

        <hr className="my-3 border-zinc-100" />

        {/* شبکه‌های اجتماعی */}
        <div className="flex items-center justify-between gap-2">
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors text-sm"
          >
            <div className="p-2 rounded-md bg-zinc-100">
              <IconBrandTelegram size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium text-zinc-900">تلگرام</span>
              <span className="text-xs text-zinc-500">ارسال پیام</span>
            </div>
          </a>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors text-sm"
          >
            <div className="p-2 rounded-md bg-zinc-100">
              <IconBrandWhatsapp size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium text-zinc-900">واتساپ</span>
              <span className="text-xs text-zinc-500">شروع چت</span>
            </div>
          </a>
        </div>

        <div className="mt-2">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-50 transition-colors text-sm"
          >
            <div className="p-2 rounded-md bg-zinc-100">
              <IconBrandInstagram size={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-medium text-zinc-900">اینستاگرام</span>
              <span className="text-xs text-zinc-500">مشاهده پیج</span>
            </div>
          </a>
        </div>

        {/* کوچک، مینیمال و دسترسی‌پذیر */}
        <footer className="mt-4 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} شرکت شما — همه حقوق محفوظ است
        </footer>
      </section>
    </main>
  );
}
