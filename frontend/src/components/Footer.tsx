import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  padding: 2rem;
  text-align: center;
  margin-top: 4rem;
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} All Occasion Cards. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer; 