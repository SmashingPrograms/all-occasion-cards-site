import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const GallerySection = styled.section`
  padding: 6rem 0;
  background-color: ${props => props.theme.colors.background};
`;

const GalleryTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 3rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardPlaceholder = styled(motion.div)`
  aspect-ratio: 3/4;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Gallery = () => {
  const placeholderCount = 9;

  return (
    <GallerySection id="gallery">
      <GalleryTitle>Our Collection</GalleryTitle>
      <GalleryGrid>
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <CardPlaceholder
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            Card Design {index + 1}
          </CardPlaceholder>
        ))}
      </GalleryGrid>
    </GallerySection>
  );
};

export default Gallery; 