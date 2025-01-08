import { makeStyles, createStyles, } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toggler: {
            '& p': {
                color: theme.palette.warning.light,
                fontWeight: 'bold',
            },
            '&:hover': {
                backgroundColor: 'transparent!important'
            }
        },
        container: {
            backgroundColor: 'transparent',
            color: 'white',
            '& .MuiListItemIcon-root': {
                color: 'inherit',
            },
            '& .MuiListItemText-root': {
                color: 'inherit',
                
                '& *': {
                    fontWeight: 'normal',
                }
            },
            '& .MuiDivider-root': {
                backgroundColor: 'inherit',
                opacity: 'inherit'
            },
            '& .MuiPaper-root': {  
                backgroundColor: theme.palette.grey[900],
                // background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(84,51,58,1) 100%)',
                color: 'lightgray',
            },
            '& .MuiBox-root': {
                display: 'flex',
                flexDirection: 'column',
                height:'100%' // 'inherit'
            },
            '& .MuiButtonBase-root.drawer-action-button': {
                alignSelf: 'flex-center',
                margin: '1rem',

                '&:hover': {
                    backgroundColor: 'orange',
                }
            }
        },
        drawerList: {
            
        }
    })
);

export default useStyles;