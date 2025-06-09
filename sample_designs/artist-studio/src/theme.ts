import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
      gray: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

export const theme = {
  colors: {
    primary: '#2D3047',
    secondary: '#E0A458',
    accent: '#93B7BE',
    background: '#FFFFFF',
    text: '#2D3047',
    gray: '#F5F5F5',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
  },
  spacing: {
    small: '1rem',
    medium: '2rem',
    large: '4rem',
  },
}; 