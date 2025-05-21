import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../assets/style/buttonStyle";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovies } from "../../../store/movie/async";
import { Navbar } from "../../navbar/navbar";
import { CardMovies } from "../cardMovies/cardMovies";
import { Footer } from "../footer/footer";

export function Movies() {
  return (
    <Box>
      <Navbar />
      <MovieContent />
      <Footer />
    </Box>
  );
}

export function MovieContent() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const heroMovie = movies.find((movie) => movie.title === "Scarface");

  return (
    <Box>
      <Img
        src="/src/assets/movieHome.png"
        w="100%"
        h={{ base: "200px", md: "500px", lg: "630px" }}
        objectFit="cover"
      />

      <Box
        position="absolute"
        left="0"
        top={{ base: "130px", md: "120px", lg: "200px" }}
        w="100%"
        h={{ base: "150px", md: "360px", lg: "520px" }}
        bgGradient="linear(to-t, black, transparent 60%)"
      />

      <Box>
        <Img
          src="/src/assets/moviesName.png"
          position="absolute"
          w={{ base: "180px", md: "400px", lg: "100%" }}
          h="100%"
          maxW={{ base: "180px", md: "400px", lg: "550px" }}
          maxH={{ base: "40px", md: "360px", lg: "120px" }}
          top={{ base: "130px", md: "198px", lg: "270px" }}
          left={{ base: "120px", md: "250px", lg: "359px" }}
          transform="translate(-50%, -50%)"
        />
        <Box
          position="absolute"
          top={{ base: "215px", md: "260px", lg: "360px" }}
          left={{ base: "170px", md: "250px", lg: "380px" }}
          transform="translate(-50%, -50%)"
          w={{ base: "280px", md: "400px", lg: "550px" }}
          mt={{ base: "0px", md: "40px", lg: "55px" }}
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
        >
          <Text fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
            Tony Montana and his best friend Manny build a drug empire in Miami.
            But the more power he gains, the bigger his ego and fears become.
            Enemies start to appear in the world of drugs.
          </Text>
          <Flex mt={2} gap={4} display={{ base: "none", md: "flex" }}>
            <Text>1983</Text>
            <Box
              bgColor="transparent"
              border="1px solid white"
              borderRadius="3px"
              fontSize="14px"
              p={1}
            >
              Movies
            </Box>
          </Flex>
          <Button sx={buttonStyle} as={Link} to={`/movie/${heroMovie?.title}`}>
            Watch Now!
          </Button>
        </Box>
      </Box>

      <CardMovies movies={movies} />
    </Box>
  );
}
