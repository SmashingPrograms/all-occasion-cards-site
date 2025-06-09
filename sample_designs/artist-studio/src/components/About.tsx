import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: ${props => props.theme.spacing.large} 0;
  background-color: ${props => props.theme.colors.gray};
`;

const AboutContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.medium};
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.medium};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.medium};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <AboutContent
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Our Story</SectionTitle>
        <Description>
          Each card is a canvas where emotions and creativity intertwine. We believe that every occasion deserves a unique expression, crafted with care and artistic vision. Our cards are more than just paper and ink – they're vessels for your heartfelt messages, designed to make every moment special.
        </Description>
        <Description>
          From birthdays to anniversaries, from congratulations to condolences, we create cards that speak the language of your heart. Every design is thoughtfully crafted to capture the essence of the moment, ensuring that your message is delivered with the perfect blend of style and sentiment.
        </Description>
      </AboutContent>
    </AboutSection>
  );
};

export default About; 