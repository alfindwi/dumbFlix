import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Outfit', monospace`,
    body: `'Outfit', monospace`,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'black',
        color: 'white',
        fontFamily: `'Outfit', monospace`,
      },
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
});

export default theme;
