import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../assets/style/buttonStyle";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeries } from "../../../store/series/async";
import { Navbar } from "../../navbar/navbar";
import { CardTvShow } from "../cardTvShow/cardTvShow";
import { Footer } from "../footer/footer";

export function TvShow() {
  return (
    <Box>
      <Navbar />
      <TvShowContent />
      <Footer />
    </Box>
  );
}

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
    <Box>
      <Img
        src="/src/assets/seriesHome.png"
        w={"100%"}
        h={{ base: "200px", md: "500px", lg: "640px" }}
        objectFit={"cover"}
      />

      <Box
        position="absolute"
        left="0"
        top={{ base: "130px", md: "120px", lg: "200px" }}
        w="100%"
        h={{ base: "150px", md: "360px", lg: "520px" }}
        bgGradient="linear(to-t, black, transparent 60%)"
      />

      <Box>
        <Img
          src="/src/assets/seriesName.png"
          position={"absolute"}
          w={{ base: "200px", md: "400px", lg: "100%" }}
          h={"100%"}
          maxW={{ base: "180px", md: "400px", lg: "550px" }}
          maxH={{ base: "40px", md: "360px", lg: "120px" }}
          top={{ base: "130px", md: "198px", lg: "270px" }}
          left={{ base: "120px", md: "250px", lg: "380px" }}
          transform={"translate(-50%, -50%)"}
        />
        <Box
          position={"absolute"}
          top={{ base: "215px", md: "260px", lg: "350px" }}
          left={{ base: "170px", md: "250px", lg: "380px" }}
          transform={"translate(-50%, -50%)"}
          w={{ base: "280px", md: "400px", lg: "550px" }}
          mt={{ base: "0px", md: "40px", lg: "55px" }}
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
        >
          <Text fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
            Money Heist is a Spanish TV series about a group of robbers led by
            "The Professor" who plan the biggest robbery in history, printing
            money at the Royal Mint of Spain. They take 67 people hostage inside
            the mint and plan to stay there for 11 days to print money while
            facing off against police forces.
          </Text>
          <Flex mt={2} gap={4} display={{ base: "none", md: "flex" }}>
            <Text>2017</Text>
            <Box
              bgColor={"transparent"}
              border={"1px solid white"}
              borderRadius={"3px"}
              fontSize={"14px"}
              p={1}
            >
              TV Series
            </Box>
          </Flex>
          <Button sx={buttonStyle} as={Link} to={`/series/${heroSeries?.seriesName.replace(/\s+/g, "-")}`}>
            Watch Now !
          </Button>
        </Box>
      </Box>

      <CardTvShow series={series} />
    </Box>
  );
}
