# انتخاب تصویر پایه برای Next.js 15 و React 19
FROM node:20-alpine AS base

# نصب Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

# ایجاد و تنظیم دایرکتوری کاری
WORKDIR /app

# کپی کردن فایل‌های پکیج و قفل
COPY package.json bun.lock ./

# نصب dependencies
RUN bun install --frozen-lockfile

# کپی کردن فایل‌های کانفیگ
COPY next.config.ts tsconfig.json postcss.config.mjs prettier.config.mjs components.json ./

# کپی کردن فایل‌های عمومی
COPY public ./public

# کپی کردن سورس کد
COPY src ./src

# ساخت پروژه
RUN bun run build

# مرحله production
FROM node:20-alpine AS runner
WORKDIR /app

# ایجاد کاربر غیر root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# کپی کردن فایل‌های ساخته شده
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

# تنظیم مالکیت فایل‌ها
RUN chown -R nextjs:nodejs /app
USER nextjs

# تنظیم پورت
EXPOSE 3000

# تنظیم متغیر محیطی
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# دستور برای شروع اپلیکیشن
CMD ["node", "server.js"]
