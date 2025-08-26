import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', monospace`,
    body: `'Montserrat', monospace`,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#000000',
        color: 'white',
        fontFamily: `'Montserrat', monospace`,
      },
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
});

export default theme;
