import AIBuilder from './AIBuilder';
import SectionWrapper from '../UtilityComponents/SectionWrapper';
import PulsatingIconTitleWrapper from '../UtilityComponents/PulsatingIconTitleWrapper/PulsatingIconTItleWrapper';

const Builder = () => {
  return (
    <SectionWrapper 
        sx={{
            backgroundColor: '#111',
        }}
        justify='center'
        innerWidth='xl' 
        outerWidth={false} 
        title={<SectionWrapper.Title variant="h2">Create Now</SectionWrapper.Title>}
        subtitle1={ 
            <SectionWrapper.Subtitle>
                Create your dream interior space with AI-driven designs in any style: minimalistic, modern, baroque & more — tailored to your vision.
            </SectionWrapper.Subtitle>
        }   
        subtitle2={
            <SectionWrapper.Subtitle>   
                Transform your space with AI-driven designs in any style: minimalistic, modern, baroque & more — tailored to your vision.
            </SectionWrapper.Subtitle>
        }>
        <PulsatingIconTitleWrapper /> 
        <AIBuilder isHomepage={true} />
    </SectionWrapper>
  );                
};
    
export default Builder;

