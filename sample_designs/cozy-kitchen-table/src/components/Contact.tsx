import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactSection = styled.section`
  padding: 4rem 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
`;

const ContactContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${props => props.theme.colors.paper};
  padding: 3rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 48%, ${props => props.theme.colors.primary} 49%, ${props => props.theme.colors.primary} 51%, transparent 52%);
    background-size: 20px 20px;
    opacity: 0.1;
    border-radius: ${props => props.theme.borderRadius.medium};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const IconWrapper = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <SectionTitle>Get in Touch</SectionTitle>
      <ContactContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <ContactInfo>
          <ContactItem
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <FaEnvelope />
            </IconWrapper>
            <span>hello@alloccasioncards.com</span>
          </ContactItem>
          <ContactItem
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <IconWrapper>
              <FaPhone />
            </IconWrapper>
            <span>(555) 123-4567</span>
          </ContactItem>
        </ContactInfo>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact; 