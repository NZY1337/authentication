import React from 'react';
import Layout from '../../../helpers/layout/Layout';
import ClassicImageLayout from './subvariants/ClasicImageLayout/ClasicImageLayout';
import FullheightLayoutImage from './subvariants/FullheightLayoutImage/FullheightLayoutImage';
import { Container } from '@mui/material';
import useImageStyle from './style';


interface ImageLayoutProps {
    gridSpacing: number;
    layoutType: string;
}

const ImageLayout: React.FC<ImageLayoutProps> = ({ gridSpacing, layoutType }: ImageLayoutProps) => {
    const classes = useImageStyle({ layoutType});

    const renderImageLayout = (type: string) => {
        switch (type) {
            case 'clasic':
                return (
                    <Container>
                        <ClassicImageLayout gridSpacing={gridSpacing} />
                    </Container>
                )
            case 'fullheight':
                return <FullheightLayoutImage gridSpacing={gridSpacing} />
            default:
                return (
                    <Container>
                        <ClassicImageLayout gridSpacing={gridSpacing} />
                    </Container>
                )
        }
    }

    return (
        <Layout classes={classes.imageLayout}>
            {renderImageLayout(layoutType)}
        </Layout>
    );
};


export default ImageLayout;