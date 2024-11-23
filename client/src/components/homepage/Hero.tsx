import React, { useState, MouseEvent } from 'react';
import { Container, Typography, Box, } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Navigation from '../navigation';
import useHeroStyle from './style';
import { DataArray } from './types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BaseModal from '../helpers/modal/BaseModal';
import { settings1 } from './settings.tsx'
import testVideo from '../../assets/video/nature-video-1.mp4';

import Carousel from '../helpers/carousel/Carousel';
import RenderContent from '../helpers/content/RenderContent';

// https://github.com/sdras/hero-generator?tab=readme-ov-file

interface HeroProps {
    handleOpen: (e: MouseEvent) => void;
    handleClose: () => void;
    open: boolean;
    onHandleAddGridSpacing: (value: 'inc' | 'dec') => void;
    gridSpacing: number;
}

const Hero: React.FC<HeroProps> = ({ handleOpen, handleClose, open, gridSpacing }) => {
    const classes = useHeroStyle();
    return <Hero.ImageContent classes={classes} gridSpacing={gridSpacing} />
};

const HeroLayout = ({ children }: { children: React.ReactNode }) => {
    const classes = useHeroStyle();

    return (
        <Container maxWidth={false} disableGutters className={classes.imageContainer}>
            <Navigation />
            {children}
        </Container>
    );
}

Hero.ImageContent = ({ data, classes, gridSpacing }: { data: DataArray; classes: any; gridSpacing: number }) => {
    return (
        <HeroLayout>
            <Container>
                <RenderContent data={settings1} classes={classes} gridSpacing={gridSpacing} />
            </Container>
        </HeroLayout>
    );
};

Hero.VideoContent = ({ data, classes, gridSpacing }: { data: DataArray; classes: any; gridSpacing: number }) => {
    return (
        <HeroLayout>
            <Navigation />
            
            <Container disableGutters sx={{ zIndex: 1 }}>
                <RenderContent data={data} classes={classes} gridSpacing={gridSpacing} />
            </Container>

            <video
                controls={false}
                autoPlay
                loop
                muted
                preload="auto"
                className={classes.video}
            >
                <source src={testVideo} type="video/mp4" />
            </video>
            <div className="overlay"></div>
        </HeroLayout>
    );
};

Hero.SliderContent = ({ classes, gridSpacing }: {  classes: any; gridSpacing: number }) => {
    return (
        <>
            <Navigation />
            <Carousel classes={classes} gridSpacing={gridSpacing} />
        </>
    );
}

export default Hero;
