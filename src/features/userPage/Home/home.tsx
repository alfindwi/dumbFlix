import { Box, Button, Flex, Img, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { buttonStyle } from "../../../assets/style/buttonStyle";
import { Navbar } from "../../navbar/navbar";
import { CardMovie } from "../cardHome/cardMovie";
import { CardSeries } from "../cardHome/cardSeries";
import { Footer } from "../footer/footer";

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
  return (
    <Box>
      <Img
        src="/src/assets/bgHome.png"
        w="100%"
        h={{ base: "200px", md: "360px", lg: "520px" }}
        objectFit="cover"
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
      />

      <Box
        position="absolute"
        left="0"
        top={{ base: "130px", md: "240px", lg: "340px" }}
        w="100%"
        h={{ base: "150px", md: "200px", lg: "260px" }}
        bgGradient="linear(to-t, black, transparent 60%)"
      />

      <Box>
        <Img
          src="/src/assets/fontHome.png"
          position={"absolute"}
          w={{ base: "200px", md: "400px", lg: "500px" }}
          top={{ base: "120px", md: "198px", lg: "200px" }}
          left={{ base: "130px", md: "250px", lg: "390px" }}
          transform={"translate(-50%, -50%)"}
          userSelect="none"
          sx={{
            userDrag: "none",
            WebkitUserDrag: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
        />
        <Box
          position={"absolute"}
          top={{ base: "159px", md: "260px", lg: "310px" }}
          left={{ base: "170px", md: "250px", lg: "420px" }}
          transform={"translate(-50%, -50%)"}
          w={{ base: "280px", md: "400px", lg: "580px" }}
          mt={{ base: "55px", md: "70px", lg: "100px" }}
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
        >
          <Text fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
            tells the story of Walter White, a high school chemistry teacher in
            Albuquerque, New Mexico, who is diagnosed with lung cancer. Facing
            imminent death, Walter decides to turn to crime by making crystal
            meth with the help of Jesse Pinkman
          </Text>
          <Flex mt={2} gap={4} display={{ base: "none", md: "flex" }}>
            <Text>2008</Text>
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
          <Button sx={buttonStyle} as={Link} to="/series">
            Watch Now !
          </Button>
        </Box>
      </Box>
      <CardSeries />
      <CardMovie />
    </Box>
  );
}
