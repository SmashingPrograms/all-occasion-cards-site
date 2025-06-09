import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const GallerySection = styled.section`
  padding: 4rem 0;
  position: relative;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  position: relative;
`;

const CardPlaceholder = styled(motion.div)`
  background-color: ${props => props.theme.colors.paper};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  aspect-ratio: 3/4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Gallery = () => {
  const cards = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    rotation: Math.random() * 10 - 5, // Random rotation between -5 and 5 degrees
  }));

  return (
    <GallerySection id="gallery">
      <SectionTitle>Our Collection</SectionTitle>
      <CardGrid>
        {cards.map((card) => (
          <CardPlaceholder
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.id * 0.1 }}
            style={{ transform: `rotate(${card.rotation}deg)` }}
            whileHover={{ scale: 1.05, rotate: 0 }}
          >
            Card Sample {card.id + 1}
          </CardPlaceholder>
        ))}
      </CardGrid>
    </GallerySection>
  );
};

export default Gallery; 