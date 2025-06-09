import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactSection = styled.section`
  padding: 6rem 0;
  background-color: ${props => props.theme.colors.background};
`;

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const Icon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactTitle>Get in Touch</ContactTitle>
        <ContactInfo
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContactItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Icon>
              <FaEnvelope />
            </Icon>
            <span>contact@elegantgallery.com</span>
          </ContactItem>
          <ContactItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Icon>
              <FaPhone />
            </Icon>
            <span>(555) 123-4567</span>
          </ContactItem>
        </ContactInfo>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact; 