import React from 'react';
import { Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import RenderContent from '../../../helpers/content/RenderContent';
import Layout from '../../../helpers/layout/Layout';
import useSliderStyle from './style';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {settings1, settings2, settings3} from './settings';

const Carousel = ({ gridSpacing, classes }) => {
    const data = [settings1, settings2, settings3];
    
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {data.map((settings) => {
        const gridImage = settings.grid[0].container.containerSettings.content.image;
        return (
          <SwiperSlide key={settings.id}>
            <Container 
              maxWidth={false}
              sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                backgroundImage: gridImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Container>
                <RenderContent data={settings} classes={classes} gridSpacing={gridSpacing} />    
              </Container>
            </Container>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const SliderLayout = ({ gridSpacing }) => {
    const classes = useSliderStyle();

    return (
        <Layout classes={classes.sliderLayout}>
            <Carousel classes={classes} gridSpacing={gridSpacing} />
        </Layout>
    );
};


export default SliderLayout;