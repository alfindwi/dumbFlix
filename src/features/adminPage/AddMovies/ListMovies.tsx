import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovies } from "../../../store/movie/async";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { MovieList } from "./MovieList";

export function ListMovies() {
  return (
    <>
      <NavbarAdmin />
      <Content />
    </>
  );
}
export function Content() {
  const dispatch = useAppDispatch();

  const { movies } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <Box h={"100vh"} p={9}>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={8}>
        <Flex alignItems={"center"}>
          <Text fontSize={"30px"} mr={4} fontWeight={"bold"}>
            List Movies
          </Text>
        </Flex>

        <Button
          bgColor={"#E50914"}
          _hover={{ bgColor: "#E50914" }}
          as={Link}
          to={"/admin/addmovie"}
          fontSize={"13px"}
          size={"sm"}
          p={5}
          fontWeight={"bold"}
        >
          Add Film
        </Button>
      </Flex>
      <MovieList movies={movies} />
    </Box>
  );
}
