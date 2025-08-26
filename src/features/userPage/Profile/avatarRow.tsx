"use client";

import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const avatars = [
  "https://i.pinimg.com/736x/f6/00/87/f60087d580207d36931611ae6bee1abf.jpg",
  "https://i.pinimg.com/1200x/9e/a9/60/9ea960489a9a71c46c946413683b3d49.jpg",
  "https://i.pinimg.com/736x/71/20/30/712030a2d588a4f0db4d3881ee392dab.jpg",
  "https://i.pinimg.com/736x/d3/51/84/d351847348dd0dabeac308be8e2bb072.jpg",
  "https://i.pinimg.com/1200x/24/ef/40/24ef40ec8bbf6730e5b3ff46347f804b.jpg",
  "https://i.pinimg.com/1200x/d2/30/34/d2303406abaeb828122b55ddacc8a2a9.jpg",
  "https://i.pinimg.com/736x/78/73/07/78730784e6335107f0af5cd57b40cf59.jpg",
  "https://i.pinimg.com/1200x/90/9f/78/909f7811907f9add78b702e96508c166.jpg",
  "https://i.pinimg.com/1200x/d7/14/89/d71489f4403159fa1b89350b72cf7ff6.jpg",
  "https://i.pinimg.com/1200x/31/ce/54/31ce548706a44b8fa8413bf5d6081a46.jpg",
];

export const AvatarRow = ({
  title,
  avatars,
}: {
  title: string;
  avatars: string[];
}) => {
  return (
    <Box mb={8}  px={8}>
      <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
        {title}
      </Text>

      <Flex wrap="wrap" gap={6} justify="flex-start">
        {avatars.map((src, idx) => (
          <Box
            key={idx}
            w="140px"  
            h="140px"
            borderRadius="md"
            overflow="hidden"
            border="3px solid transparent"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              transform: "scale(1.05)",
              borderColor: "#E50914",
            }}
          >
            <Image
              src={src}
              alt={`Avatar ${idx}`}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
