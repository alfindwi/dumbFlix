import {
  Box,
  Flex,
  Text,
  Link,
  HStack,
  Divider,
  Img,
  Button,
} from "@chakra-ui/react";
import { FaAnglesUp } from "react-icons/fa6";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box bg="black" color="white" py={6}>
      <Divider borderColor="gray.600" display={{ base: "block", md: "block" }} />

      <Box
        mt={4}
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Img
          src="/src/assets/ALFLIX.png"
          w={"160px"}
          ml={"23px"}
          display={{ base: "none", md: "block" }}
        />

        <Text
          ml={{ base: "0", md: "23px" }}
          fontSize={{ base: "10px", md: "12px" }}
          mt={2}
          color={"#929292"}
          w={{ base: "100%", md: "550px" }}
          textAlign={{base: "center", md: "justify"}}
        >
          Platform ini tidak menampilkan film asli secara penuh. Untuk menonton
          versi resmi, silakan gunakan layanan seperti Netflix, Hulu, Disney+
          Hotstar, Amazon Prime Video, dan lainnya.
        </Text>
      </Box>

      <Divider
        borderColor="gray.600"
        mt={4}
        display={{ base: "none", md: "block" }}
      />
      <Flex
        mt={4}
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        maxW="1200px"
        mx="auto"
        px={6}
      >
        <Text fontSize="11px" mb={{ base: 4, md: 0 }} color={"#929292"}>
          Copyright © {new Date().getFullYear()} by Alfin Dwi. All rights
          reserved.
        </Text>

        <HStack spacing={4} align="center">
          <Link
            href="https://www.linkedin.com/in/alfin-dwi-wadani"
            target="_blank"
            aria-label="Twitter"
            _hover={{ color: "#E50914", textDecoration: "none" }}
          >
            <Text fontSize="15px" fontWeight="bold">
              Linkedin
            </Text>
          </Link>

          <Divider orientation="vertical" borderColor="#363434" height="20px" />

          <Link
            href="https://www.instagram.com/alvindvvi/"
            target="_blank"
            aria-label="Instagram"
            _hover={{ color: "#E50914", textDecoration: "none" }}
          >
            <Text fontSize="15px" fontWeight="bold">
              Instagram
            </Text>
          </Link>

          <Divider orientation="vertical" borderColor="#363434" height="20px" />

          <Link
            href="https://github.com/alfindwi"
            target="_blank"
            aria-label="Github"
            _hover={{ color: "#E50914", textDecoration: "none" }}
          >
            <Text fontSize="15px" fontWeight="bold">
              Github
            </Text>
          </Link>

          <Button
            as={FaAnglesUp}
            onClick={scrollToTop}
            bg="transparent"
            _hover={{ bg: "transparent", transform: "scale(1.1)" }}
            _active={{ bg: "transparent" }}
            cursor="pointer"
          />
        </HStack>
      </Flex>
    </Box>
  );
}
