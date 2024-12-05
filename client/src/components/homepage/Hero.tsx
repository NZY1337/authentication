import React, {  MouseEvent } from 'react';
// import ImageLayout from '../helpers/variants/Image/ImageLayout';
import VideoLayout from '../../helpers/variants/Video/VideoLayout';
// import SliderLayout from '../helpers/variants/Slider/SliderLayout';

// https://github.com/sdras/hero-generator?tab=readme-ov-file

interface HeroProps {
    handleOpen: (e: MouseEvent) => void;
    handleClose: () => void;
    open: boolean;
    onHandleAddGridSpacing: (value: 'inc' | 'dec') => void;
    gridSpacing: number;
}

const Hero: React.FC<HeroProps> = ({ gridSpacing }) => {
    // return <ImageLayout gridSpacing={gridSpacing} layoutType={'fullheight'} />
    return <VideoLayout  gridSpacing={gridSpacing} />
    // return <SliderLayout gridSpacing={gridSpacing} />
};

export default Hero;
