import { useAppDispatch } from "../store";
import { Navbar } from "../features/navbar/navbar";
import { Footer } from "../features/userPage/footer/footer";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../store/user/async";

export function LayoutUser() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const hiddenRoutes = [
    "/",
    "/login",
    "/register",
    "/profile-icons",
    "/account",
    "/subscription/plans",
  ];

  const isMovieDetail = location.pathname.startsWith("/movie/");

  const hideNavbar = hiddenRoutes.includes(location.pathname) || isMovieDetail;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
