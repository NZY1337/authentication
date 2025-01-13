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
            '& .nav-logo': {
                ...theme.applyStyles('dark', {
                }),
                ...theme.applyStyles('light', {
                    // color: theme.palette.grey[100],
                }),
            }
        }),
      },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '& .MuiTypography-root': {
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[100],
            }),
            ...theme.applyStyles('light', {
                color: theme.palette.grey[100],
            }),
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

