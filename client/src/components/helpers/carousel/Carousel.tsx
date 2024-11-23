// import Swiper core and required modules
import { Navigation, Autoplay } from 'swiper/modules';
import { Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import RenderContent from '../content/RenderContent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { settings1, settings2, settings3 } from '../../homepage/settings';

const Carousel = ({ classes, gridSpacing }) => {
  // Group settings into an array for iteration
  const settingsArray = [settings1, settings2, settings3];  

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {settingsArray.map((settings, index) => {
        const gridImage = settings.grid[0].container.containerSettings.content.image;
        return (
            <SwiperSlide key={index}>
                <Container 
                    maxWidth={false}
                    disableGutters
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
                        <RenderContent data={settings} classes={classes} gridSpacing={gridSpacing} disableGutters />    
                    </Container>
                </Container>
        </SwiperSlide>
        )
      })}
    </Swiper>
  );
};

export default Carousel;
