# انتخاب تصویر پایه
FROM node:18-buster as base

# نصب Bun
RUN curl -fsSL https://bun.sh/install | bash

# تنظیم متغیر محیطی برای Bun
ENV PATH="/root/.bun/bin:${PATH}"

# ایجاد و تنظیم دایرکتوری کاری
WORKDIR /app

# کپی کردن پکیج‌ها و فایل‌های مربوط به پروژه
COPY package.json bun.lock ./
COPY tsconfig.json ./

# نصب dependencies
RUN bun install

# کپی کردن بقیه فایل‌های پروژه
COPY . .

# ایجاد فایل محیطی مورد نیاز برای ساخت
RUN mkdir -p .env && echo "NEXT_PUBLIC_BASE_URL=https://admin.tanbaku.com" > .env/.env

# ساخت پروژه تایپ‌اسکریپت
RUN bun run build

# تنظیم پورت
EXPOSE 3000

# دستور برای شروع اپلیکیشن
CMD ["bun", "start"]
