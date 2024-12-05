import { makeStyles } from '@mui/styles';

const setBackgroundImageOrColor = (layoutType: string) => {
    console.log(layoutType)
    if (layoutType === 'classic') {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {
      backgroundColor: 'red',
    };
};


const useStyles = makeStyles({
    imageLayout: (props) => ({
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        height: '100vh',
        maxWidth: '100%',
        overflow: 'hidden',
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg)`,
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/247616/pexels-photo-247616.jpeg)`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        ...setBackgroundImageOrColor(props.layoutType)
    })
  });



export default useStyles;



