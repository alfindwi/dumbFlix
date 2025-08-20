import { Box, Center, Flex, Img, Spinner, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getMovieByName } from "../../../store/movie/async";

export function DescTrailerMovie() {
  const { title } = useParams();
  const dispatch = useAppDispatch();
  const { movies, loading } = useAppSelector((state) => state.movie);
  const movie = Array.isArray(movies) ? movies[0] : movies;

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (title) {
      dispatch(getMovieByName(title));
    }
  }, [title, dispatch]);

  if (loading || !movie) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }
  return (
    <Box ml={{ base: "10px", md: "50px", lg: "40ppx" }} mt={"30px"} mb={"50px"}>
      <Flex align="flex-start" direction={"row"}>
        <Img
          src="https://image.tmdb.org/t/p/w185/v31MsWhF9WFh7Qooq6xSBbmJxoG.jpg"
          w={{ base: "80px", md: "90px", lg: "100px" }}
          h={{ base: "120px", md: "130px", lg: "150px" }}
          mr="20px"
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {movie.title}
          </Text>

          <Flex align="center" mt={2}>
            <Text fontSize="sm" color="#929292" mr={4}>
              {movie.year}
            </Text>
            <Flex
              bgColor="transparent"
              border="1px solid #929292"
              borderRadius="3px"
              fontSize="14px"
              p={1}
              w={"70px"}
              h={"27px"}
              justifyContent={"center"}
              alignItems={"center"}
              color={"#929292"}
            >
              Movies
            </Flex>
          </Flex>

          <Text
            fontSize={{ base: "11px", md: "14px", lg: "sm" }}
            mt={3}
            w={{ base: "250px", md: "500px", lg: "450px" }}
            textAlign="justify"
            lineHeight="1.6"
          >
            {movie.description}
          </Text>
        </Box>
        <Box ml={"150px"} display={{ base: "none", md: "block", lg: "block" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${extractYouTubeId(
              movie.trailer
            )}`}
            width={"480px"}
            height={"225px"}
          />
          <Text mt={2} fontSize={"14px"}>
            {movie.title}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
