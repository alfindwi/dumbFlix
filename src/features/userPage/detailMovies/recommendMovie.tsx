import {
    Box,
    Center,
    Flex,
    Icon,
    Img,
    Skeleton,
    SkeletonText,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovies } from "../../../store/movie/async";

export function RecommendMovie() {
  const dispatch = useAppDispatch();
  const {
    movies,
    loading,
    detailMovie: movie,
  } = useAppSelector((state) => state.movie);

  let similiarMovies = movies.filter((m) => m.id === movie?.id);

  similiarMovies = similiarMovies.sort(() => Math.random() - 0.5).slice(0, 7);

  useEffect(() => {
    if (!movies.length) {
      dispatch(getMovies());
    }
  }, [dispatch, movies.length]);

  if (!Array.isArray(movies)) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Box px={{ base: "20px", md: "60px" }} py={8}>
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Text fontSize="2xl" fontWeight="semibold">
          Similar Movies
        </Text>
      </Flex>

      <Box position="relative" mt={10}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-movie",
            prevEl: ".swiper-button-prev-movie",
          }}
          modules={[Navigation]}
          style={{ padding: "10px" }}
        >
          {loading
            ? Array.from({ length: 7 }, (_, index) => (
                <SwiperSlide key={index} style={{ width: "auto" }}>
                  <Box
                    mt={4}
                    w={"160px"}
                    bg={"black"}
                    borderRadius={"md"}
                    overflow={"hidden"}
                  >
                    <Skeleton height={"240px"} borderTopRadius={"md"} />
                    <SkeletonText mt="2" noOfLines={2} spacing="2" />
                  </Box>
                </SwiperSlide>
              ))
            : similiarMovies.map((movie) => (
                <SwiperSlide key={movie.id} style={{ width: "auto" }}>
                  <Box
                    mt={4}
                    bgColor="black"
                    borderRadius="md"
                    w="100%"
                    maxW="160px"
                    transition="transform 0.5s ease, box-shadow 0.2s ease"
                    cursor="pointer"
                    as={Link}
                    to={`/movie/${movie.slug}`}
                    display="block"
                  >
                    <Box
                      position="relative"
                      w="100%"
                      h="auto"
                      overflow="hidden"
                      aspectRatio="2/3"
                      _hover={{
                        ".image": {
                          transform: "scale(1.1)",
                          filter: "brightness(0.3)",
                        },
                        ".play-icon": { opacity: 1 },
                      }}
                    >
                      <Img
                        src={movie.poster}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform 0.3s ease, filter 0.3s ease"
                        borderTopRadius="md"
                        className="image"
                        alt={movie.title}
                        loading="lazy"
                      />
                      <Box
                        className="play-icon"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        opacity={0}
                        cursor="pointer"
                        border={"5px solid white"}
                        borderRadius="full"
                        w="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={MdPlayArrow} color="white" boxSize={8} />
                      </Box>
                    </Box>
                    <Text
                      fontSize="15px"
                      isTruncated
                      mt={2}
                      fontWeight="semibold"
                    >
                      {movie.title}
                    </Text>
                    <Text
                      fontSize="12px"
                      mt={1}
                      fontWeight="medium"
                      color="#929292"
                    >
                      {movie.year}
                    </Text>
                  </Box>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </Box>
  );
}
