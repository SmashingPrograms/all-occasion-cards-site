import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
      wood: string;
      paper: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    shadows: {
      subtle: string;
      medium: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
  }
} 