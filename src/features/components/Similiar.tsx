import {
  Box,
  Flex,
  Icon,
  Img,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { MdArrowBack, MdArrowForward, MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type RecommendProps = {
  title: string;
  items: {
    id: number;
    title: string;
    slug: string;
    poster: string;
    year: string;
  }[];
  currentSlug: string;
  loading?: boolean;
  basePath: string;
  corouselType?: string;
};

export function SimiliarCorousel({
  title,
  items,
  currentSlug,
  loading = false,
  basePath,
  type = "movie",
}: RecommendProps & { type?: "movie" | "series" } ) {
  let filteredItems = items.filter((item) => item.slug !== currentSlug);

  filteredItems = filteredItems.sort(() => Math.random() - 0.5).slice(0, 7);

  const nextClass = `swiper-button-next-${type}`;
  const prevClass = `swiper-button-prev-${type}`;
  return (
    <Box px={{ base: "20px", md: "60px" }} py={8}>
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Text fontSize="2xl" fontWeight="semibold">
          {title}
        </Text>
      </Flex>

      <Box position="relative" mt={10}>
        <Box
          className={nextClass}
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          p={3}
          borderRadius="full"
          cursor="pointer"
          zIndex="10"
          display={{ base: "block", md: "none" }}
        >
          <Icon as={MdArrowForward} color="#e50914" boxSize={10} />
        </Box>

        <Box
          className={prevClass}
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          p={3}
          borderRadius="full"
          cursor="pointer"
          zIndex="10"
          display={{ base: "block", md: "none" }}
        >
          <Icon as={MdArrowBack} color="#e50914" boxSize={10} />
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
            nextEl: `.${nextClass}`,
            prevEl: `.${prevClass}`,
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
            : filteredItems.map((item) => (
                <SwiperSlide key={item.id} style={{ width: "auto" }}>
                  <Box
                    mt={4}
                    bgColor="black"
                    borderRadius="md"
                    w="100%"
                    maxW="160px"
                    transition="transform 0.5s ease, box-shadow 0.2s ease"
                    cursor="pointer"
                    as={Link}
                    to={`${basePath}/${item.slug}`}
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
                        src={item.poster}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        transition="transform 0.3s ease, filter 0.3s ease"
                        borderTopRadius="md"
                        className="image"
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
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
                      {item.title}
                    </Text>
                    <Text
                      fontSize="12px"
                      mt={1}
                      fontWeight="medium"
                      color="#929292"
                    >
                      {item.year}
                    </Text>
                  </Box>
                </SwiperSlide>
              ))}
        </Swiper>
      </Box>
    </Box>
  );
}
