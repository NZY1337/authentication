import { Theme, Components } from '@mui/material/styles';

export const navigationCustomization: Components<Theme> = {
  MuiAppBar: {
    styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
            boxShadow: 'none',  
            backgroundColor: 'transparent',
            ...theme.applyStyles('dark', {
                backgroundColor: 'transparent',
                backgroundImage: 'none',  
            }),
            ...theme.applyStyles('light', {
                backgroundColor: 'transparent',
                boxShadow: 'none',  
            }),
            '& .MuiToolbar-root': {
                display: 'flex', 
                justifyContent: 'space-between',
            },
            '& .MuiButtonBase-root': {
                color:'red',
                // backgroundColor:'white',
            },
            '& .nav-logo': {
            ...theme.applyStyles('dark', {
                    color: theme.palette.warning.light,
                }),
                ...theme.applyStyles('light', {
                    color: theme.palette.grey[100],
                }),
            }
        }),
      },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        // Target Typography inside MenuItem
        '& .MuiTypography-root': {
            ...theme.applyStyles('dark', {
                color: theme.palette.warning.light,
            }),
            ...theme.applyStyles('light', {
                color: theme.palette.grey[100],
            }),
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
                color: theme.palette.grey[300],
            },
        },
        '&:hover': {   
            backgroundColor: 'transparent',
        },
      }),
    },
  },
  
};

