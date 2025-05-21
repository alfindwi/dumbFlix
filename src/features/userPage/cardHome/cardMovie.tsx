import { Box, Button, Flex, Icon, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward, MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getMovies } from "../../../store/movie/async";

export function CardMovie() {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector((state) => state.movie);
  const [page] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const paginateMovies = movies.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Text fontSize="24px" fontWeight="semibold">
          Movies
        </Text>
        <Button
          size={{ base: "xs", md: "sm" }}
          as={Link}
          to={"/movies"}
          fontSize={"12px"}
          bgColor={"#e50914"}
          _hover={{ bgColor: "#e50914" }}
        >
          See All
        </Button>
      </Flex>

      <Box position="relative">
        <Box
          className="swiper-button-next-movie"
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          p={3}
          borderRadius="full"
          cursor="pointer"
          zIndex="10"
          display="block"
        >
          <Icon as={MdArrowForward} color="white" boxSize={10} />
        </Box>

        <Box
          className="swiper-button-prev-movie"
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          p={3}
          borderRadius="full"
          cursor="pointer"
          zIndex="10"
          display="block"
        >
          <Icon as={MdArrowBack} color="white" boxSize={10} />
        </Box>

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
          {paginateMovies.map((movie) => (
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
                to={`/movie/${movie.title.replace(/ /g, "-")}`}
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
                <Text fontSize="15px" mt={2} fontWeight="semibold">
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
