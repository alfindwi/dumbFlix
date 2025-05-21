import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Img,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import ReactPlayer from "react-player";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "../footer/footer";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovieByName } from "../../../store/movie/async";

export function DetailMovie() {
  return (
    <Box>
      <Navbar />
      <DetailMovieContent />
      <Footer />
    </Box>
  );
}

export function DetailMovieContent() {
  const { title } = useParams();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const { movies, loading } = useAppSelector((state) => state.movie);
  const { user } = useAppSelector((state) => state.auth);
  const movie = Array.isArray(movies) ? movies[0] : movies;
  const videoRef = useRef<HTMLDivElement>(null);

  const playIconSize = useBreakpointValue({ base: "40px", md: "60px" });
  const playPadding = useBreakpointValue({ base: "8px", md: "12px" });

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (title) {
      const decodedName = title.replace(/-/g, " ");
      dispatch(getMovieByName(decodedName));
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

  const handlePlayClick = () => {
    if (!user) {
      toast({
        title: "Please login first",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsPlaying(!isPlaying);
  };

  if (loading || !movie) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="auto"
        width="100vw"
        position="relative"
        zIndex={0}
        backgroundColor="black"
      >
        <Box>
          <Flex
            justifyContent="center"
            alignItems="center"
            height="auto"
            width="100vw"
            position="relative"
            zIndex={0}
            backgroundColor="black"
          >
            <Box width="100vw" ref={videoRef}>
              <AspectRatio ratio={2.2 / 1}>
                <ReactPlayer
                  url={movie.video}
                  width="100%"
                  height="100%"
                  playing={!user ? false : isPlaying}
                  controls
                  light={movie.thumbnail}
                  onClick={handlePlayClick}
                  playIcon={
                    <MdPlayArrow
                      onClick={handlePlayClick}
                      style={{
                        color: "white",
                        fontSize: playIconSize,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        border: "4px solid white",
                        padding: playPadding,
                        borderRadius: "50%",
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  }
                />
              </AspectRatio>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Box
        ml={{ base: "10px", md: "50px", lg: "40ppx" }}
        mt={"30px"}
        mb={"50px"}
      >
        <Flex align="flex-start" direction={"row"}>
          <Img
            src={movie.poster}
            alt={movie.title}
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
          <Box
            ml={"150px"}
            display={{ base: "none", md: "block", lg: "block" }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${extractYouTubeId(
                movie.trailer
              )}`}
              width={"480px"}
              height={"225px"}
            />
            <Text mt={2} fontSize={"14px"}>
              Trailer: {movie.title}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
