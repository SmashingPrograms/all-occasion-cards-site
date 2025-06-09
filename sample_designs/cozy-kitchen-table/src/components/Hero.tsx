import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.large};
  margin: 2rem 0;
  padding: 4rem;
  position: relative;
  overflow: hidden;
`;

const WoodBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.wood};
  opacity: 0.1;
  z-index: 0;
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 1;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const Hero = () => {
  return (
    <HeroSection>
      <WoodBackground />
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Handcrafted Cards for Every Occasion
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Bringing warmth and personality to your special moments with carefully crafted greeting cards
        </Subtitle>
      </Content>
    </HeroSection>
  );
};

export default Hero; 