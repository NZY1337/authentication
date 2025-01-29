import { Theme, Components } from '@mui/material/styles';

export const navigationCustomization: Components<Theme> = {
  MuiAppBar: {
    styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
            boxShadow: 'none',  
            backgroundColor: 'transparent',
        }),
      },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '& .MuiTypography-root': {
            color: theme.palette.grey[100],
            textDecoration: 'none',
            '&:hover': {
                color: theme.palette.grey[500],
            },
        },
        '&:hover': {   
            backgroundColor: 'transparent',
        },
      }),
    },
  },
};

