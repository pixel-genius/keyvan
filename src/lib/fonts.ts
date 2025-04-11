import localFont from 'next/font/local';
import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const yekanBakh = localFont({
  src: [
    {
      path: '../../public/fonts/woff2/YekanBakh-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/woff2/YekanBakh-ExtraBlack.woff2',
      weight: '950',
      style: 'normal',
    },
  ],
  variable: '--font-yekan-bakh',
}); 