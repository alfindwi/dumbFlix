import {
  Box,
  Flex,
  VStack,
  HStack,
  Img,
  Text,
  Badge,
  Center,
  Spinner,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";

type Category = { id: string | number; categoryName: string };

type DescTrailerProps = {
  poster: string;
  title: string;
  seriesName?: string; 
  description: string;
  categories?: Category[];
  trailerUrl: string;
  loading?: boolean;
};

export function DescTrailer({
  poster,
  title,
  description,
  categories = [],
  trailerUrl,
  seriesName,
  loading = false,
}: DescTrailerProps) {
  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box px={{ base: "20px", md: "60px" }} py={8}>
      <Flex direction={{ base: "column", lg: "row" }} gap={8} align="flex-start">
        <Box flex={2}>
          <Flex gap={6} mb={6}>
            <Img
              src={poster}
              alt={title}
              w={{ base: "120px", md: "150px" }}
              h={{ base: "180px", md: "225px" }}
              borderRadius="md"
              objectFit="cover"
            />

            <VStack align="flex-start" spacing={4} flex={1}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  {title}
                </Text>
                <HStack spacing={4} mb={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.400" mb={2}>
                      Synopsis:
                    </Text>
                    <Text fontSize="sm" lineHeight="1.6" color="gray.300">
                      {description}
                    </Text>
                  </Box>
                </HStack>
              </Box>

              {Array.isArray(categories) && categories.length > 0 && (
                <Box>
                  <Text fontSize="sm" color="gray.400" mb={2}>
                    Genres:
                  </Text>
                  <Flex gap={2} flexWrap="wrap">
                    {categories.map((cat) => (
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
              )}
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
                trailerUrl
              )}`}
              width="100%"
              height="250px"
            />
            <Box p={4}>
              <Text fontSize="sm" fontWeight="semibold" mb={1}>
                Official Trailer
              </Text>
              <Text fontSize="xs" color="gray.400">
                {title || seriesName}
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
            url={`https://www.youtube.com/watch?v=${extractYouTubeId(trailerUrl)}`}
            width="100%"
            height="200px"
          />
        </Box>
      </Box>
    </Box>
  );
}
