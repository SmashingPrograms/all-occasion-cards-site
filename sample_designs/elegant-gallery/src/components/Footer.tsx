import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  padding: 2rem;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Copyright>
        © {new Date().getFullYear()} The Elegant Gallery. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 