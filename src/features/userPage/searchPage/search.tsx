import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";

const mockResults = [
  {
    id: 1,
    title: "Eternal Brotherhood: Season 2",
    description:
      "As war erupts across the divided Xichuan continent, young commander Zichuan Xiu is betrayed and exiled after a failed truce with the rival Bei clan.",
    image:
      "https://res.cloudinary.com/db2rr1kej/image/upload/v1747199584/DumbFlix/poster/c0e2bb8b-0c7f-459e-904a-d27c1c60b0fa.webp",
    type: "MOVIE",
  },
  {
    id: 2,
    title: "The Summer: Season 1",
    description: "",
    image:
      "https://upload.wikimedia.org/wikipedia/id/b/bc/Interstellar_film_poster.jpg",
    type: "MOVIE",
  },
  {
    id: 3,
    title: "The Summer (2021)",
    description:
      "In a small Korean town, two 18-year-old girls fall in love, dreaming of moving to Seoul together after graduation.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMUpPugEO35YtOVGF9l6jsWNYM07TbKveXOQ&s",
    type: "TV",
  },
];

export function Search() {
  return (
    <Box
      px={{ base: "15px", md: "100px" }}
      py={{ base: "30px", md: 20 }}
      color="white"
    >
      <VStack spacing={6} align="stretch">
        {mockResults.map((item) => (
          <Flex
            key={item.id}
            direction="row"
            gap={{ base: 3, md: 6 }}
            borderBottom="1px solid rgb(33, 35, 38)"
            pb={4}
            align="flex-start"
          >
            <Image
              src={item.image}
              objectFit="cover"
              w={{ base: "90px", md: "120px" }}
              h={{ base: "130px", md: "150px" }}
              alt={item.title}
              userSelect="none"
              sx={{
                userDrag: "none",
                WebkitUserDrag: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                userSelect: "none",
                "@media screen and (min-width: 1920px)": {
                  height: "750px",
                },
              }}
              borderRadius="3px"
              _hover={{ cursor: "pointer", filter: "brightness(50%)" }}
              transition="all 0.2s ease-in-out"
              flexShrink={0}
            />
            <Box maxW="100%">
              <Tag
                size="sm"
                mb={1}
                bgColor={item.type === "MOVIE" ? "#cb0404" : "#123524"}
                color="white"
              >
                {item.type}
              </Tag>
              <Heading size="sm" fontWeight="semibold" mb={1} noOfLines={2}>
                {item.title}
              </Heading>
              {item.description && (
                <Text
                  fontSize="sm"
                  color="gray.400"
                  noOfLines={2}
                  maxW={{ base: "220px", md: "900px" }}
                >
                  {item.description}
                </Text>
              )}
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
