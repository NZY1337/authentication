import React from 'react';
import { Container } from '@mui/material';
import testVideo from '../../../assets/video/pet-vet.mp4';
import Layout from '../../../helpers/layout/Layout';
import RenderContent from '../../../helpers/content/RenderContent';
import useVideoStyle from './style';
import settings from './settings';

interface VideoLayoutProps {
    classes: unknown;
    gridSpacing: number;
}

const VideoLayout: React.FC<VideoLayoutProps> = ({ gridSpacing }) => {
    const classes = useVideoStyle();

    return (
        <Layout classes={classes.videoLayout}>
            <Container sx={{ zIndex: 1 }}>
                <RenderContent data={settings} gridSpacing={gridSpacing} />
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
        </Layout>
    );
};

export default VideoLayout;