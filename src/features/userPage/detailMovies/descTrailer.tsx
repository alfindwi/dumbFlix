import {
  Badge,
  Box,
  Center,
  Flex,
  HStack,
  Img,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getMovieByName } from "../../../store/movie/async";

export function DescTrailerMovie() {
  const { title } = useParams();
  const dispatch = useAppDispatch();
  const { loading, detailMovie } = useAppSelector((state) => state.movie);
  const movie = Array.isArray(detailMovie) ? detailMovie[0] : detailMovie;

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
    <Box px={{ base: "20px", md: "60px" }} py={8}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        align="flex-start"
      >
        <Box flex={2}>
          <Flex gap={6} mb={6}>
            <Img
              src={movie.poster}
              alt={movie.title}
              w={{ base: "120px", md: "150px" }}
              h={{ base: "180px", md: "225px" }}
              borderRadius="md"
              objectFit="cover"
            />

            <VStack align="flex-start" spacing={4} flex={1}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  {movie.title}
                </Text>
                <HStack spacing={4} mb={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.400" mb={2}>
                      Synopsis:
                    </Text>
                    <Text fontSize="sm" lineHeight="1.6" color="gray.300">
                      {movie.description}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <Text fontSize="sm" color="gray.400" mb={2}>
                  Genres:
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {Array.isArray(movie.categories) &&
                    movie.categories.map((cat: { id: string | number; categoryName: string }) => (
                      <Badge
                        key={cat.id}
                        variant="subtle"
                        colorScheme="gray"
                        fontSize="xs"
                      >
                        {cat.categoryName}
                      </Badge>
                    ))}
                </Flex>
              </Box>
            </VStack>
          </Flex>
        </Box>

        <Box
          flex={1}
          display={{ base: "none", lg: "block" }}
          position="sticky"
          top="20px"
        >
          <Box bg="gray.900" borderRadius="md" overflow="hidden">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${extractYouTubeId(
                movie.trailer
              )}`}
              width="100%"
              height="250px"
            />
            <Box p={4}>
              <Text fontSize="sm" fontWeight="semibold" mb={1}>
                Official Trailer
              </Text>
              <Text fontSize="xs" color="gray.400">
                {movie.title}
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>

      <Box display={{ base: "block", lg: "none" }} mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Trailer
        </Text>
        <Box bg="gray.900" borderRadius="md" overflow="hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${extractYouTubeId(
              movie.trailer
            )}`}
            width="100%"
            height="200px"
          />
        </Box>
      </Box>
    </Box>
  );
}
