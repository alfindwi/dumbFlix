import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body, text': {
        backgroundColor: 'black',
        color: 'white',
      },
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
});

export default theme;