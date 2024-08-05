import { extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
export const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/headingfont.woff2') format('woff2'),
             url('./fonts/headingfont.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'Outfit';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/bodyfont.woff2') format('woff2'),
             url('./fonts/bodyfont.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}
  />
);

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `"Outfit", 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`,
    body: `"Outfit", 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`,
  },
});

export default theme;
