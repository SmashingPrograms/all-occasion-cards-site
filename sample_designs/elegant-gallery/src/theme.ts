import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  }
}

export const theme = {
  colors: {
    primary: '#D4B996', // Dusty rose
    secondary: '#9CAF88', // Sage green
    background: '#FDFBF7', // Cream
    text: '#4A4A4A',
    accent: '#E8D5C4',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Lato', sans-serif",
  },
}; 