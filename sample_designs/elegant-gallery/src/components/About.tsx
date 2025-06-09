import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 6rem 0;
  background-color: ${props => props.theme.colors.background};
`;

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
`;

const AboutText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const About = () => {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <AboutTitle>Our Story</AboutTitle>
        <AboutText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to The Elegant Gallery, where every card tells a story. We believe that
          the perfect greeting card can capture the essence of any moment, from joyous
          celebrations to heartfelt condolences.
        </AboutText>
        <AboutText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Each of our designs is carefully crafted with attention to detail and a passion
          for creating meaningful connections. We combine traditional elegance with
          contemporary style to bring you cards that are both timeless and modern.
        </AboutText>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 