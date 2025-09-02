import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Img,
  Spinner,
  Text,
  // useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdInfoOutline, MdPlayArrow } from "react-icons/md";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovieBySlug } from "../../../store/movie/async";

export function DetailMovieContent() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const { movies, loading } = useAppSelector((state) => state.movie);
  const { user } = useAppSelector((state) => state.auth);
  const movie = Array.isArray(movies) ? movies[0] : movies;

  // const playIconSize = useBreakpointValue({ base: "40px", md: "60px" });
  // const playPadding = useBreakpointValue({ base: "8px", md: "12px" });

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    dispatch(getMovieBySlug(slug || ""));
  }, [slug, dispatch]);

  useEffect(() => {
    if (movie?.title) {
      document.title = `${movie.title} - ALFLIX`;
    }
    return () => {
      document.title = "ALFLIX";
    };
  }, [movie?.title]);

  const handlePlayClick = () => {
    if (!user) {
      toast({
        title: "Please login first",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsPlaying(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading || !movie) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box bg="black" color="white" minH="100vh">
      {/* Hero Section */}
      <Box position="relative" w="100%" h={{ base: "60vh", md: "80vh" }}>
        {isPlaying ? (
          <AspectRatio ratio={16 / 9} w="100%" h="100%">
            <ReactPlayer
              url={movie.video}
              width="100%"
              height="100%"
              playing
              controls
            />
          </AspectRatio>
        ) : (
          <>
            <Img
              src={movie.thumbnail}
              alt={movie.title}
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition={"top"}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              w="100%"
              h="100%"
              bgGradient="linear(to-t, black 20%, transparent 80%)"
            />
            <Flex
              position="absolute"
              bottom="20%"
              left={{ base: "5%", md: "10%" }}
              direction="column"
              align="flex-start"
              gap={4}
            >
              <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
                {movie.title}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold" color="gray.400">
                {movie.year}
              </Text>
              <Flex gap={2} mt={2} flexWrap="wrap" fontSize="sm" color="gray.400">
              {Array.isArray(movie.categories) &&
                movie.categories.map((cat, index) => (
                  <Flex key={cat.id} align="center">
                    <Text>{cat.categoryName}</Text>
                    {index !== movie.categories.length - 1 && (
                      <Divider
                        ml={1}
                        orientation="vertical"
                        borderColor="gray.600"
                        height="10px"
                      />
                    )}
                  </Flex>
                ))}
            </Flex>
              <Flex gap={4}>
                <Button
                  leftIcon={<MdPlayArrow size={24} />}
                  colorScheme="red"
                  size="lg"
                  onClick={handlePlayClick}
                >
                  Play
                </Button>
                <Button
                  leftIcon={<MdInfoOutline size={24} />}
                  variant="outline"
                  color="white"
                  borderColor="white"
                  size="lg"
                >
                  More Info
                </Button>
              </Flex>
            </Flex>
          </>
        )}
      </Box>

      <Box px={{ base: 4, md: 10 }} py={8}>
        <Flex gap={6} direction={{ base: "column", md: "row" }}>
          <Img
            src={movie.poster}
            alt={movie.title}
            w={{ base: "120px", md: "160px" }}
            h={{ base: "180px", md: "220px" }}
            borderRadius="md"
          />
          <Box flex="1">
            <Flex align="center" gap={4}>
              <Text
                border="1px solid gray"
                px={2}
                py={1}
                fontSize="xs"
                borderRadius="md"
              >
                Movie
              </Text>
            </Flex>
            
            <Text mt={3} fontSize="md" maxW="800px" textAlign="justify">
              {movie.description}
            </Text>
          </Box>
          {/* Trailer */}
          {movie.trailer && (
            <Box flexShrink={0}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${extractYouTubeId(
                  movie.trailer
                )}`}
                width={"360px"}
                height={"200px"}
              />
              <Text mt={2} fontSize="sm">
                Trailer: {movie.title}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
