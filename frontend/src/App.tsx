import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from './theme';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Quicksand:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles>
        <AppContainer>
          <Header />
          <MainContent>
            <Hero />
            <Gallery />
            <About />
            <Contact />
          </MainContent>
          <Footer />
        </AppContainer>
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default App;
