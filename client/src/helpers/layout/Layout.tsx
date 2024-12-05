import React from 'react';
import { Container } from '@mui/material';
import Navigation from '../../components/navigation';

const Layout: React.FC<{ children: React.ReactNode, classes: string}> = ({ children, classes }) => {
    return (
        <Container maxWidth={false} className={classes} disableGutters>
            <Navigation />
            {children}
        </Container>
    );
};

export default Layout;