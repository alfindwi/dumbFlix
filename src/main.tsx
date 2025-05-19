import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Router from "./router/index.tsx";
import store from "./store/index.ts";
import theme from "./theme/theme.ts";
import "swiper/css";
import "swiper/css/navigation";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
