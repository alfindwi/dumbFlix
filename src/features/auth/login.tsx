import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/button";

export function Login() {
  return (
    <Box
      w="100%"
      bgImage="url('/src/assets/bgPayment.avif')"
      bgSize="contain"
      bgPosition="center"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h={"100%"}
        bg="blackAlpha.400"
      />

      <Flex
        position="relative"
        align="center"
        px={{ base: "10px", md: "80px", lg: "100px" }}
        py="30px"
        justify="space-between"
        gap={4}
        zIndex={2}
        as={Link}
        to="/"
      >
        <Image
          src="/src/assets/alflix.png"
          h={{ base: "18px", md: "20px", lg: "30px" }}
          alt="Logo"
          
        />
      </Flex>

      <Flex
        position={"relative"}
        align="center"
        h={"100vh"}
        zIndex={2}
        direction={"column"}
        px={8}
      >
        <Box
          bg="blackAlpha.700"
          p={10}
          borderRadius={8}
          w={{ base: "100%", md: "460px" }}
        >
          <Text
            fontSize={{ base: "24px", md: "30px", lg: "30px" }}
            fontWeight="semibold"
            color="white"
            mb={4}
          >
            Masuk
          </Text>

          <Input
            placeholder="Email"
            type="email"
            size="md"
            mb={4}
            border={"1px solid #D2D2D2"}
            borderRadius={"3px"}
            color="white"
            bg="blackAlpha.500"
            py={7}
            _placeholder={{ color: "#B1B1B1", fontSize: "18px" }}
          />
          <Input
            placeholder="Password"
            type="password"
            size="md"
            mb={4}
            border={"1px solid #D2D2D2"}
            borderRadius={"3px"}
            color="white"
            bg="blackAlpha.500"
            py={7}
            _placeholder={{ color: "#B1B1B1", fontSize: "18px" }}
          />
          <PrimaryButton w={"100%"}>Masuk</PrimaryButton>
          <Link to="/forgot-password">
            <Text mt={4} textAlign={"center"} textDecor={"underline"}>
              Lupa Password?
            </Text>
          </Link>
          <Flex mt={8} justifyContent="center" align="center">
            <Text>Baru di Alflix?</Text>
            <Link to="/register">
              <Text textDecor="underline" ml={2}>
                Daftar Sekarang
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>

      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="120px"
        bgGradient="linear(to-t, #000000ff 0%, transparent 80%)"
        clipPath="ellipse(75% 100% at 50% 100%)"
      />
    </Box>
  );
}
