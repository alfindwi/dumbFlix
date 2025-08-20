import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../assets/style/buttonStyle";
import { Navbar } from "../../navbar/navbar";
import { CardMovie } from "../cardHome/cardMovie";
import { CardSeries } from "../cardHome/cardSeries";
import { Footer } from "../footer/footer";
import { useAppSelector } from "../../../store";

export function Home() {
  return (
    <Box>
      <Navbar />
      <HomeContent />
      <Footer />
    </Box>
  );
}

export function HomeContent() {
  const { series } = useAppSelector((state) => state.series);

  const heroSeries = series.find(
    (series) => series.seriesSlug === "breaking-bad"
  );
  return (
    <>
      <Box
        w="100%"
        h={{ base: "70vh", md: "90vh", lg: "100vh" }}
        bgImage="url('/src/assets/bgHome.avif')"
        bgSize="cover"
        bgPosition={{ base: "center", md: "top" }}
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgGradient={{
            base: "linear(to-t, black 1%, transparent 10%)",
            md: "linear(to-t, black 1%, transparent 5%)"
          }}
        />

        <Box
          position="absolute"
          bottom={{ base: "30px", md: "50px", lg: "80px" }}
          left={{ base: "20px", md: "60px", lg: "100px" }}
          maxW={{ base: "90%", md: "60%", lg: "40%" }}
          color="white"
          transform={{ base: "translateY(-20%)", md: "translateY(5%)" }}
        >
          <Img
            src="/src/assets/fontHome.avif"
            w={{ base: "200px", md: "400px", lg: "500px" }}
            mb={4}
          />
          <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} mb={3}>
            tells the story of Walter White, a high school chemistry teacher in
            Albuquerque, New Mexico, who is diagnosed with lung cancer. Facing
            imminent death, Walter decides to turn to crime by making crystal
            meth with the help of Jesse Pinkman
          </Text>
          <Flex gap={4} mb={3} align="center">
            <Text fontSize={{ base: "xs", md: "sm" }}>2008</Text>
            <Box border="1px solid white" px={2} py={1} borderRadius="md">
              TV Series
            </Box>
          </Flex>
          <Button
            sx={buttonStyle}
            as={Link}
            to={`/series/${heroSeries?.seriesSlug}`}
          >
            Watch Now !
          </Button>
        </Box>
      </Box>
      <CardMovie />
      <CardSeries />
    </>
  );
}
