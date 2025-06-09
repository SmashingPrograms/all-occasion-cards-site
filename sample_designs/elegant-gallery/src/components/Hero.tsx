import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.background} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  overflow: hidden;
`;

const WatercolorBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/watercolor-bg.png') center/cover no-repeat;
  opacity: 0.1;
  z-index: 0;
`;

const HeroContent = styled(motion.div)`
  text-align: center;
  z-index: 1;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Hero = () => {
  return (
    <HeroSection>
      <WatercolorBackground />
      <HeroContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Heartfelt Cards for Every Special Moment</Title>
        <Subtitle>
          Handcrafted with love, designed to make your sentiments shine
        </Subtitle>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 