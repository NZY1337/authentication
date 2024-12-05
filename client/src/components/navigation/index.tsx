import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Container, MenuList, MenuItem, Button, Link } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import useNavigationStyle from './style';
import MenuDrawer from './drawer';
import { NavLink } from 'react-router-dom';

// https://reactrouter.com/en/main/components/nav-link


const Navigation: React.FC = () => {
  const { loginUser, user, logoutUser } = useAppContext();
  const classes = useNavigationStyle();
  
  return (
    <AppBar className={classes.container}>
      <Container>
        <MenuDrawer />
        
        <Toolbar className={classes.toolbar}>
            <Box className="nav-logo">
                <Typography variant="h4" sx={{color: 'orange', fontWeight: 'bold', display: { xs: "none", md: "flex" } }}>
                    Pet Vet
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
                        <MenuItem disableRipple className={classes.hiUser}>
                            <Link component="span">
                                Hi {user.name}
                            </Link>
                        </MenuItem>
                    ) :
                        <MenuItem disableRipple>
                            <Link component={ReactRouterLink} to="/authentication">
                                Login/Register
                            </Link>
                        </MenuItem>
                    }
                    
                    {user && 
                        <MenuItem disableRipple>
                            <Button  variant='contained' color="error" onClick={logoutUser}>
                                Log Out
                            </Button>
                        </MenuItem>
                    }
                </MenuList>
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;





