import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: 'red',
        },
        title: {
            marginBottom: 10,
            color: '#fff',
        },
        header: {
            marginBottom: 10,
            color: '#fff',
        },
        imageContainer: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
            alignItems: 'center',
            height: '100vh',
            maxWidth: '100%',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        videoContainer: {
            position: 'relative',
            overflow: 'hidden',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',

            '& .overlay': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the color and opacity as needed
                zIndex: 0,
            },

            '& video': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                objectFit: 'cover',
            }
        },
        sliderContainer: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,

        },
        box: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        nav: {
            flexGrow: 1,
        },
        navTitle: {
            flexGrow: 1,
            color: '#fff',
        },
        columnParent: {
            padding: 10
        },
        columnChild: {
           
        }
    })
);

export default useStyles;