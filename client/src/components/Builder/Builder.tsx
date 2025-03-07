import AIBuilder from './AIBuilder';
import SectionWrapper from '../UtilityComponents.tsx/SectionWrapper';
import PulsatingIconTitleWrapper from '../UtilityComponents.tsx/PulsatingIconTitleWrapper/PulsatingIconTItleWrapper';

const Builder = () => {
  return (
    <SectionWrapper 
        justify='center'
        innerWidth='xl' 
        outerWidth={false} 
        title={<SectionWrapper.Title variant="h1">Create Now</SectionWrapper.Title>}
        subtitle1={ 
            <SectionWrapper.Subtitle>
                Create your dream interior space with AI-driven designs in any style: minimalistic, modern, baroque & more — tailored to your vision.
            </SectionWrapper.Subtitle>
        }
        subtitle2={
            <SectionWrapper.Subtitle>
                Transform your space with AI-driven designs in any style: minimalistic, modern, baroque & more — tailored to your vision.
            </SectionWrapper.Subtitle>
        }
    >
        <PulsatingIconTitleWrapper />
        <AIBuilder />
    </SectionWrapper>
  );
};

export default Builder;

