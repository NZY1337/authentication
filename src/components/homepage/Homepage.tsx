import Hero from './Hero';
import Builder from '../Builder/Builder';
import KeyPoints from './KeyPoints';
import DesignVariations from './DesignVariation';
import  Footer  from "../Footer/Footer";

const Home = () => {
    console.log('homepage')
    return <>
        <Hero />
        {/* <Builder /> */}
        <KeyPoints />
        <DesignVariations />   
        <Footer /> 
    </>
}

export default Home;

