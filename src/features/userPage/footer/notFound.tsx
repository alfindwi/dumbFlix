import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "./footer";

export function NotFound() {
  return (
    <>
      <Navbar />

      <Flex
        flex="1"
        direction="column"
        align="center"
        justify="center"
        px={6}
        textAlign="center"
      >
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={2}>
          404 - Page Not Found
        </Text>
        <Text color="gray.400" maxW="500px" mb={6}>
          Sorry, we can't find the page you’re looking for. Please check the URL
          or go back to the homepage.
        </Text>
        <Button
          as={Link}
          to="/"
          bg="#E50914"
          _hover={{ bg: "#b20710" }}
          color="white"
          size="lg"
          fontWeight="bold"
        >
          Back to Home
        </Button>
      </Flex>

      <Footer />
    </>
  );
}
