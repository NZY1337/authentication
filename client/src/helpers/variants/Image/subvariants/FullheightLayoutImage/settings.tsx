import { createColumn, createButton, theme, setIconStyles } from '../../../../settings';

const columns = [
    createColumn({
        // columnImage: {
        //     enabled: true,
        //     url: 'https://images.pexels.com/photos/4825725/pexels-photo-4825725.jpeg',
        //     sx: { width: '100%', objectFit: 'cover', borderRadius: '5px' },
        // },
        columnTitle: { 
            enabled: true, 
            text: 'Hi,', 
            variant: 'h3', 
            sx: { 
                color: 'white', 
                pt: theme.spacing(3) 
            } 
        },
        columnSubtitle: { 
            enabled: true, 
            text: 'Dynamic description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
            variant: 'body1', 
            sx: {
                color: theme.colors.primary
            } 
        },
        columnDescription: { 
            enabled: false, 
            text: 'Dynamic description', 
            variant: 'body1', 
            sx: {} 
        },
        columnSettings: { 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(https://images.pexels.com/photos/247616/pexels-photo-247616.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        breakPoints: { md: 6, lg: 6 },
    }),
    createColumn({
        columnImage: {
            enabled: false,
            url: 'https://images.pexels.com/photos/4825725/pexels-photo-4825725.jpeg',
            sx: { width: '100%', objectFit: 'cover', borderRadius: '5px' },
        },
        columnTitle: { 
            enabled: true, 
            text: 'Monsoon Brunch',
            variant: 'h1', 
            sx: { color: theme.colors.primary, pt: theme.spacing(3) } },
        columnSubtitle: { 
            enabled: false, 
            text: 'Monsoon Brunch', 
            variant: 'h3', 
            sx: { color: theme.colors.primary } 
        },
        columnDescription: {
            enabled: true,
            text: 'We import the most beautiful flowers from the monsoon region. The monsoon rains are essential for the farmers to grow their crops and feed their families..',
            variant: 'body1',
            sx: { color: 'white' },
        },
        columnButton: createButton({
           enabled: true,
           size:'large',
           text: 'DISCOVER',
           variant: 'outlined',
           action:  (action) => (e: unknown) => e ? action(e) : action(),
           hasIcon: {
               enabled: true,
               icon: 'AddCircleIcon',
               position: 'left',
               getStyle: () => ({
                   ...setIconStyles({
                       hasIcon: { enabled: true, position: 'left' },
                       svgProps: {
                            color: 'red'
                       },
                   }),
                   color: 'red',
                   mt: 2,
               }),
           },
           sx: {
               mt: 2,
               color: 'green',
               fontWeight: 'bold',
               '&:hover': {
                   color: 'orange',
                   borderColor: 'black',
                   opacity: '.9'
               },
               '&:hover svg': {
                   color: 'orange',
               },
           },
       }),
        columnSettings: { 
            alignItems: 'center', 
            justifyContent: 'center', 
            display: 'flex',
        },
        breakPoints: { md: 6, lg: 6 },
    }), 
];

export const settings = {
    grid: [
        {
            container: {
                columns,
                containerSettings: {
                    sx: { 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        height: 'inherit',
                    },
                },
            },
        },
    ],
};

export default settings;

