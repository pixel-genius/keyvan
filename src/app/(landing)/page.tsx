"use client";
import Image from "next/image";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "../../app/globals.css";

// import required modules
import { Pagination } from "swiper/modules";

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
      <div className="flex flex-col items-center justify-center">
        <div className=""></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
