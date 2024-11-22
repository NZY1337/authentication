// import Swiper core and required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { Container, Typography, Box, } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import RenderContent from '../content/RenderContent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = ({data, classes, gridSpacing, children}) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 2000 }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      <SwiperSlide>
        <Container>
            <RenderContent data={data} classes={classes} gridSpacing={gridSpacing} />
        </Container>
      </SwiperSlide>

      <SwiperSlide>
        <Container>
            <RenderContent data={data} classes={classes} gridSpacing={gridSpacing} />
        </Container>
      </SwiperSlide>

      <SwiperSlide>
        <Container>
            <RenderContent data={data} classes={classes} gridSpacing={gridSpacing} />
        </Container>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;