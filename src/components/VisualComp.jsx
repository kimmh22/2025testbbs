import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './slide.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function VisualComp() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        // modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded"
        style={{ height: '300px' }}
      >
        <SwiperSlide className="slideCont">Slide 1</SwiperSlide>
        <SwiperSlide className="bslideCont bg-primary">Slide 2</SwiperSlide>
        <SwiperSlide className="slideCont">Slide 3</SwiperSlide>
      </Swiper>
    </>
  );
}

export default VisualComp;
