import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, MenuList, MenuItem, Link } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import MenuDrawer from './drawer';
import ColorModeSelect from '../../theme/ColorModeSelect';

const Navigation: React.FC = () => {
  const { user } = useAppContext();
  
  return (
    <AppBar>
      <Container>
        <MenuDrawer />
        
        <Toolbar>
            <Box className="nav-logo">
                <Typography variant="h4" sx={{ display: { xs: "none", md: "flex" } }}>
                    JWT
                </Typography>
            </Box> 
                                                            
            <Box sx={{ display: { xs: "none", md: "flex" }}}>
                <MenuList sx={{display: "flex"}}>
                    <MenuItem disableRipple>
                        <Link component={ReactRouterLink} to="/">
                            Home  
                        </Link>
                    </MenuItem>
                    
                    {user ? (
                        <>
                            <MenuItem disableRipple>
                                <Link component={ReactRouterLink} to="/dashboard">
                                    Dashboard  
                                </Link>
                            </MenuItem>
                        </>
                    ) :
                        <>
                            <MenuItem disableRipple>
                                <Link component={ReactRouterLink} to="/user/login">
                                    Login
                                </Link>
                            </MenuItem>
                        </>
                    }
                    
                    <MenuItem>
                        <ColorModeSelect  />
                    </ MenuItem>
                </MenuList>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;





