import { Navbar } from "../features/navbar/navbar";
import { Footer } from "../features/userPage/footer/footer";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function LayoutUser() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
