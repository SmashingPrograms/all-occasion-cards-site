import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.large};
  margin: 2rem 0;
`;

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const AboutContent = styled(motion.div)`
  background-color: ${props => props.theme.colors.paper};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.subtle};
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
`;

const About = () => {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionTitle>About Us</SectionTitle>
        <AboutContent
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paragraph>
            Welcome to our cozy corner of creativity! We're passionate about crafting beautiful, 
            heartfelt greeting cards that bring warmth and joy to every occasion. Each card is 
            carefully designed with love and attention to detail, making your special moments 
            even more memorable.
          </Paragraph>
          <Paragraph>
            Our journey began with a simple idea: to create cards that feel like they were made 
            by a friend, not a factory. We believe that the perfect card can speak volumes and 
            create lasting connections between people. That's why we pour our hearts into every 
            design, ensuring that each card carries its own unique personality and charm.
          </Paragraph>
          <Paragraph>
            Whether you're celebrating a birthday, expressing sympathy, or just want to brighten 
            someone's day, we have a card that will help you convey your feelings perfectly. 
            Each card is made with high-quality materials and designed to be treasured for years 
            to come.
          </Paragraph>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 