import { useAppDispatch } from "../store";
import { Navbar } from "../features/navbar/navbar";
import { Footer } from "../features/userPage/footer/footer";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../store/user/async";
import Cookies from "js-cookie";

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
  const isSeriesDetail = location.pathname.startsWith("/series/");

  const hideNavbar = hiddenRoutes.includes(location.pathname) || isMovieDetail || isSeriesDetail;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, Cookies.get("token")]);

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
