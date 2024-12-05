import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        videoLayout: {
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
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the color and opacity as needed
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
    })
);

export default useStyles;