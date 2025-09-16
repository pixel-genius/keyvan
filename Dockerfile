# Stage 1: Build
FROM oven/bun:1.1.22 AS builder

# مسیر کاری
WORKDIR /app

# فقط فایل‌های package رو کپی می‌کنیم تا کش npm/bun حفظ بشه
COPY package.json bun.lockb ./
COPY tsconfig.json next.config.js postcss.config.js tailwind.config.js ./

# نصب dependencies (با cache بهتر)
RUN bun install --frozen-lockfile

# کپی بقیه کد پروژه
COPY . .

# ساخت پروژه
RUN bun run build


# Stage 2: Production
FROM oven/bun:1.1.22-slim AS runner

# مسیر کاری
WORKDIR /app

# تنها فایل‌های ضروری برای اجرا رو کپی می‌کنیم
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# تعیین متغیرهای محیطی
ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

EXPOSE 3000

# دستور اجرا
CMD ["bun", "start"]
