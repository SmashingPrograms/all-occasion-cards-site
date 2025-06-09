import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing.large} 0;
  background-color: ${props => props.theme.colors.background};
`;

const ContactContent = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.medium};
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
  align-items: center;
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colors.gray};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  svg {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Contact = () => {
  return (
    <ContactSection id="contact">
      <ContactContent
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SectionTitle>Get in Touch</SectionTitle>
        <ContactInfo>
          <ContactItem
            href="mailto:contact@alloccasioncards.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope size={24} />
            contact@alloccasioncards.com
          </ContactItem>
          <ContactItem
            href="tel:+1234567890"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPhone size={24} />
            (123) 456-7890
          </ContactItem>
        </ContactInfo>
      </ContactContent>
    </ContactSection>
  );
};

export default Contact; 