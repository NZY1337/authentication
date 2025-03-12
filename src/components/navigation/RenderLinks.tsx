import { MenuItem, Link, MenuList} from '@mui/material';
import { useAppContext } from '../../context/AppContext';
import { Link as ReactRouterLink } from 'react-router-dom';
import SubMenu from '../UtilityComponents/SubMenu';

const RenderLinks = () => {
    const { user } = useAppContext();

    return (
        <MenuList sx={{display: "flex"}}>
            <MenuItem disableRipple >
                <Link component={ReactRouterLink} to="/">
                    Home  
                </Link>
            </MenuItem>

            <SubMenu />

            {user ? (
                <MenuItem disableRipple>
                    <Link component={ReactRouterLink} to="/dashboard">
                        Dashboard  
                    </Link>
                </MenuItem>
            ) :
                <MenuItem disableRipple >
                    <Link component={ReactRouterLink} to="/user/login">
                        Login
                    </Link>
                </MenuItem>
            }
            
            {/* <MenuItem><ColorModeSelect /></ MenuItem> */}
        </MenuList>
    )
}

export default RenderLinks