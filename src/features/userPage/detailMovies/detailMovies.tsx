"use client";

import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Img,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdPlayArrow } from "react-icons/md";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovieBySlug } from "../../../store/movie/async";
import { DescTrailerMovie } from "./descTrailer";

export function DetailMovieContent() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const { movies, loading } = useAppSelector((state) => state.movie);
  const { users } = useAppSelector((state) => state.user);
  const movie = Array.isArray(movies) ? movies[0] : movies;

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
    if (!users) {
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
      <Center h="100vh" bg="black">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box bg="black" minH="100vh" color="white">
      <Box
        position="relative"
        height={{ base: "450px", sm: "250px", md: "700px", lg: "100vh" }}
      >
        <Flex
          align="center"
          gap={3}
          as={Link}
          position="absolute"
          to={"/dashboard"}
          top={0}
          left={0}
          right={0}
          px={{ base: "15px", sm: "20px", md: "40px", lg: "60px" }}
          py={4}
          zIndex={10}
          bg="transparent"
        >
          <FaArrowLeftLong color="white" size={22} cursor="pointer" />
          <Flex direction="column" align="start">
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
              fontWeight="bold"
              color="white"
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
            >
              {movie.title}
            </Text>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              fontWeight="medium"
              color="gray.200"
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
            >
              {movie.year} •{" "}
              {movie.categories?.map((c) => c.categoryName).join(", ")}
            </Text>
          </Flex>
        </Flex>

        {isPlaying ? (
            <ReactPlayer
              url={movie.video}
              width="100%"
              height="100%"
              playing
              controls
            />
          
        ) : (
          <>
            <Img
              src={movie.thumbnail}
              alt={movie.title}
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center"
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-t, black, transparent 50%, transparent)"
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-r, black 20%, transparent 50%, transparent)"
            />

            <Box
              position="absolute"
              bottom={{ base: "15px", sm: "25px", md: "40px", lg: "60px" }}
              left={{ base: "15px", sm: "20px", md: "40px", lg: "60px" }}
              right={{ base: "15px", sm: "20px", md: "auto" }}
              maxW={{ base: "100%", sm: "95%", md: "60%", lg: "50%" }}
              zIndex={2}
            >
              <Text
                fontSize={{
                  base: "xl",
                  sm: "2xl",
                  md: "3xl",
                  lg: "4xl",
                  xl: "5xl",
                }}
                fontWeight="bold"
                mb={{ base: 2, sm: 3, md: 4 }}
                textShadow="2px 2px 4px rgba(0,0,0,0.8)"
                lineHeight={{ base: "1.2", md: "1.1" }}
              >
                {movie.title}
              </Text>

              <HStack
                spacing={{ base: 2, sm: 3, md: 4 }}
                mb={{ base: 2, sm: 3, md: 4 }}
              >
                <Badge
                  colorScheme="white"
                  fontSize={{ base: "xs", sm: "sm" }}
                  px={2}
                  py={1}
                >
                  {movie.year}
                </Badge>
                <Badge
                  variant="outline"
                  colorScheme="gray"
                  fontSize={{ base: "xs", sm: "sm" }}
                  px={2}
                  py={1}
                >
                  Movie
                </Badge>
              </HStack>

              <Text
                fontSize={{ base: "xs", sm: "sm", md: "md" }}
                mb={{ base: 4, sm: 5, md: 6 }}
                maxW={{ base: "100%", md: "500px" }}
                textShadow="1px 1px 2px rgba(0,0,0,0.8)"
                noOfLines={{ base: 2, sm: 3 }}
                lineHeight="1.4"
              >
                {movie.description}
              </Text>

              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={{ base: 2, sm: 3, md: 4 }}
                align={{ base: "stretch", sm: "center" }}
              >
                <Button
                  leftIcon={<MdPlayArrow />}
                  size={{ base: "md", sm: "lg" }}
                  bg="white"
                  color="black"
                  _hover={{ bg: "gray.200" }}
                  onClick={handlePlayClick}
                  fontWeight="bold"
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  Play
                </Button>
              </Flex>
            </Box>
          </>
        )}
      </Box>

      <DescTrailerMovie />
    </Box>
  );
}
