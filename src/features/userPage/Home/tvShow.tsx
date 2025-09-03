import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../assets/style/buttonStyle";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeries } from "../../../store/series/async";
import { CardTvShow } from "../cardTvShow/cardTvShow";

export function TvShowContent() {
  const dispatch = useAppDispatch();
  const { series } = useAppSelector((state) => state.series);

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);

  const heroSeries = series.find(
    (series) =>
      series.seriesName.replace(/\s+/g, "-") ===
      "Money Heist".replace(/\s+/g, "-")
  );
  return (
    <>
      <Box
        w="100%"
        h={{ base: "70vh", md: "90vh", lg: "100vh" }}
        bgImage="url('/src/assets/seriesHome.avif')"
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
            md: "linear(to-t, black 1%, transparent 5%)",
          }}
        />

        <Box
          position="absolute"
          bottom={{ base: "50px", md: "50px", lg: "80px" }}
          left={{ base: "20px", md: "60px", lg: "100px" }}
          maxW={{ base: "90%", md: "60%", lg: "40%" }}
          color="white"
          transform={{ base: "translateY(-20%)", md: "translateY(5%)" }}
        >
          <Img
            src="/src/assets/seriesName.avif"
            w={{ base: "200px", md: "400px", lg: "500px" }}
            mb={4}
          />
          <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} mb={3}>
            Money Heist is a Spanish TV series about a group of robbers led by
            "The Professor" who plan the biggest robbery in history, printing
            money at the Royal Mint of Spain. They take 67 people hostage inside
            the mint and plan to stay there for 11 days to print money while
            facing off against police forces.
          </Text>
          <Flex gap={4} mb={3} align="center">
            <Text fontSize={{ base: "md", md: "sm" }}>2017</Text>
            <Box border="1px solid white" px={2} py={1} borderRadius="md">
              Series
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
      <CardTvShow series={series} />
    </>
  );
}
