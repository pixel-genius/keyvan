# انتخاب تصویر پایه
FROM node:18-buster as base

# نصب Bun
RUN curl -fsSL https://bun.sh/install | bash

# تنظیم متغیر محیطی برای Bun
ENV PATH="/root/.bun/bin:${PATH}"

# ایجاد و تنظیم دایرکتوری کاری
WORKDIR /app

# کپی کردن فایل‌های پکیج و قفل
COPY package.json bun.lock ./

# نصب dependencies
RUN bun install --frozen-lockfile

# کپی کردن فایل‌های پیکربندی
COPY tsconfig.json next.config.ts postcss.config.mjs prettier.config.mjs components.json ./
COPY eslint.config.mjs ./

# کپی کردن دایرکتوری src
COPY src/ ./src/

# کپی کردن فایل‌های عمومی
COPY public/ ./public/

# ساخت پروژه Next.js
RUN bun run build

# تنظیم پورت
EXPOSE 3000

# دستور برای شروع اپلیکیشن
CMD ["bun", "start"]
