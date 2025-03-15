"use client";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../app/globals.css";

// import required modules
import {
  IconCategory2,
  IconChartAreaLine,
  IconNews,
} from "@tabler/icons-react";
import { Pagination } from "swiper/modules";
import Winsetonicon from "../icons/winseton";

const LandingPage = () => {
  return (
    <div className="container  mx-auto w-[768px]">
      <div className="flex flex-col items-center justify-center ">
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            {" "}
            <Image
              src={"/img/sigar.png"}
              alt="sigar"
              width={1000}
              height={500}
              className="rounded-4xl p-7"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Image
              src={"/img/sigar.png"}
              alt="sigar"
              width={1000}
              height={500}
              className="rounded-4xl p-7"
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Image
              src={"/img/sigar.png"}
              alt="sigar"
              width={1000}
              height={500}
              className="rounded-4xl p-7"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex flex-row items-center gap-9 justify-evenly">
        <div className="bg-maincard rounded-xl w-12 h-12 flex justify-center items-center">
          <Winsetonicon />
        </div>
        <div className="bg-maincard rounded-xl w-12 h-12 flex justify-center items-center">
          <IconCategory2 size={24} className="text-primary-500" />
        </div>
        <div className="bg-maincard rounded-xl w-12 h-12 flex justify-center items-center">
          <IconNews size={24} className="text-primary-500" />
        </div>
        <div className="bg-maincard rounded-xl w-12 h-12 flex justify-center items-center">
          <IconChartAreaLine size={24} className="text-primary-500" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
