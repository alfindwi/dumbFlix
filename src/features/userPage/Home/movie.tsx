import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../assets/style/buttonStyle";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovies } from "../../../store/movie/async";
import { CardMovies } from "../cardMovies/cardMovies";

export function MovieContent() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const heroMovie = Array.isArray(movies)
    ? movies.find((movie) => movie.slug === "scarface")
    : null;

  return (
    <>
      <Box
        w="100%"
        h="100vh"
        bgImage="url('/src/assets/movieHome.avif')"
        bgSize="cover"
        bgPosition="top"
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgGradient="linear(to-t, black 1%, transparent 5%)"
        />

        <Box
          position="absolute"
          bottom={{ base: "30px", md: "50px", lg: "80px" }}
          left={{ base: "20px", md: "60px", lg: "100px" }}
          maxW={{ base: "90%", md: "60%", lg: "40%" }}
          color="white"
          transform="translateY(5%)"
        >
          <Img
            src="/src/assets/moviesName.avif"
            w={{ base: "200px", md: "400px", lg: "500px" }}
            mb={4}
          />
          <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} mb={3}>
            Tony Montana and his best friend Manny build a drug empire in Miami.
            But the more power he gains, the bigger his ego and fears become.
            Enemies start to appear in the world of drugs.
          </Text>
          <Flex gap={4} mb={3} align="center">
            <Text fontSize={{ base: "xs", md: "sm" }}>1983</Text>
            <Box border="1px solid white" px={2} py={1} borderRadius="md">
              Movies
            </Box>
          </Flex>
          <Button
            sx={buttonStyle}
            as={Link}
            to={`/movies/${heroMovie?.slug}` || ""}
          >
            Watch Now !
          </Button>
        </Box>
      </Box>
      <CardMovies movies={movies} />
    </>
  );
}
