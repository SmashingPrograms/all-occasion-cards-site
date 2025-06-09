import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const GallerySection = styled.section`
  padding: ${props => props.theme.spacing.large} 0;
  background-color: ${props => props.theme.colors.background};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.medium};
  padding: ${props => props.theme.spacing.medium};
`;

const CardPlaceholder = styled(motion.div)`
  aspect-ratio: 3/4;
  background-color: ${props => props.theme.colors.gray};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.colors.secondary};
    opacity: 0.2;
    border-radius: 50%;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.large};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Gallery = () => {
  const cards = Array(6).fill(null);

  return (
    <GallerySection id="gallery">
      <SectionTitle>Featured Cards</SectionTitle>
      <GalleryGrid>
        {cards.map((_, index) => (
          <CardPlaceholder
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          />
        ))}
      </GalleryGrid>
    </GallerySection>
  );
};

export default Gallery; 