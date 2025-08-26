import { Navbar } from "../features/navbar/navbar";
import { Footer } from "../features/userPage/footer/footer";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

export function LayoutUser() {
  const location = useLocation();

  const hiddenRoutes = ["/", "/login", "/register", "/profile-icons"];
  const hideNavbar = hiddenRoutes.includes(location.pathname);

  return (
    <Flex direction="column" minH="100vh">
      {!hideNavbar && <Navbar />}
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
