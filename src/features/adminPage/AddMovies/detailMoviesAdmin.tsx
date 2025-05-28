import {
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Img,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getMovieByName } from "../../../store/movie/async";
import { useParams } from "react-router-dom";

export function DetailMovieAdmin() {
  return (
    <Box>
      <NavbarAdmin />
      <Content />
    </Box>
  );
}

export function Content() {
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

  useEffect(() => {
    if (movie?.title) {
      document.title = `${movie.title} - ALFLIX`;
    }
    return () => {
      document.title = "ALFLIX";
    };
  }, [movie?.title]);

  if (loading || !movie) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex justifyContent="center" mb={4}>
        <Box w="1200px" h="600px">
          <Img src={movie.thumbnail} w="100%" h="100%" objectFit="cover" />
          <Box
            position="absolute"
            top="350px"
            left="700px"
            transform="translate(-50%, -50%)"
            transition="opacity 0.3s ease"
            cursor="pointer"
            bgColor="rgba(0, 0, 0, 0.6)"
            borderRadius="full"
            w="90px"
            h="90px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={MdPlayArrow} color="white" fontSize="6xl" />
          </Box>
        </Box>
      </Flex>
      <Box ml={"40px"} mt={"20px"} mb={"50px"}>
        <Flex align="flex-start" direction={"row"}>
          <Img src={movie.poster} w="100px" h="150px" mr="20px" />
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

            <Flex gap={2} mt={2} flexWrap="wrap" fontSize="12px">
              {Array.isArray(movie.categories) &&
                movie.categories.map((cat, index) => (
                  <Flex key={cat.id} align="center" color="#929292">
                    <Text>{cat.categoryName}</Text>
                    {index !== movie.categories.length - 1 && (
                      <Divider
                        ml={1}
                        orientation="vertical"
                        borderColor="#363434"
                        height="10px"
                      />
                    )}
                  </Flex>
                ))}
            </Flex>

            <Text
              fontSize="sm"
              mt={3}
              w="450px"
              textAlign="justify"
              lineHeight="1.6"
            >
              {movie.description}
            </Text>
          </Box>
          <Box ml="180px">
            <Box
              as="iframe"
              width="400px"
              height="200px"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                movie.trailer
              )}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              border="none"
            />
            <Text mt={2} fontSize="14px">
              Trailer {movie.title}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
