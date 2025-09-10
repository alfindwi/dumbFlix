import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Img,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdPlayArrow } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeriesByName } from "../../../store/series/async";
import { DescTrailer } from "./descriptionTrailer";
import { Season } from "./season";

export function DetailSeriesContent() {
  const { seriesSlug } = useParams();
  const dispatch = useAppDispatch();
  const { selectedSeries: series, loading } = useAppSelector(
    (state) => state.series
  );
  const seriesDetail = Array.isArray(series) ? series[0] : series;

  useEffect(() => {
    dispatch(getSeriesByName(seriesSlug || ""));
  }, [seriesSlug, dispatch]);

  useEffect(() => {
    if (seriesDetail?.seriesName) {
      document.title = `${seriesDetail.seriesName} - ALFLIX`;
    }
    return () => {
      document.title = "ALFLIX";
    };
  }, [seriesDetail?.seriesName]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading || !seriesDetail) {
    return (
      <Center h="100vh" bg="black">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box bg="black" minH="100vh" color="white">
      <Box
        position="relative"
        height={{ base: "450px", sm: "250px", md: "700px", lg: "100vh" }}
      >
        <Flex
          align="center"
          gap={3}
          as={Link}
          position="absolute"
          to={"/dashboard"}
          top={0}
          left={0}
          right={0}
          px={{ base: "15px", sm: "20px", md: "40px", lg: "60px" }}
          py={4}
          zIndex={10}
          bg="transparent"
        >
          <FaArrowLeftLong color="white" size={22} cursor="pointer" />
          <Flex direction="column" align="start">
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
              fontWeight="bold"
              color="white"
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
            >
              {seriesDetail?.seriesName}
            </Text>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              fontWeight="medium"
              color="gray.200"
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
            >
              {seriesDetail?.seriesYear}
            </Text>
          </Flex>
        </Flex>

        <>
          <Img
            src={seriesDetail?.seasons?.[0]?.episodes?.[0]?.episodeImage}
            alt={seriesDetail?.seriesName}
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="center"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-t, black, transparent 50%, transparent)"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-r, black 20%, transparent 50%, transparent)"
          />

          <Box
            position="absolute"
            bottom={{ base: "15px", sm: "25px", md: "40px", lg: "60px" }}
            left={{ base: "15px", sm: "20px", md: "40px", lg: "60px" }}
            right={{ base: "15px", sm: "20px", md: "auto" }}
            maxW={{ base: "100%", sm: "95%", md: "60%", lg: "70%" }}
            zIndex={2}
          >
            <Text
              fontSize={{
                base: "xl",
                sm: "2xl",
                md: "3xl",
                lg: "4xl",
                xl: "5xl",
              }}
              fontWeight="bold"
              mb={{ base: 2, sm: 3, md: 4 }}
              textShadow="2px 2px 4px rgba(0,0,0,0.8)"
              lineHeight={{ base: "1.2", md: "1.1" }}
            >
              {seriesDetail?.seriesName}
            </Text>

            <HStack
              spacing={{ base: 2, sm: 3, md: 4 }}
              mb={{ base: 2, sm: 3, md: 4 }}
            >
              <Badge
                colorScheme="white"
                fontSize={{ base: "xs", sm: "sm" }}
                px={2}
                py={1}
              >
                {seriesDetail?.seriesYear}
              </Badge>
              <Badge
                variant="outline"
                colorScheme="gray"
                fontSize={{ base: "xs", sm: "sm" }}
                px={2}
                py={1}
              >
                series
              </Badge>
            </HStack>

            <Text
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              mb={{ base: 4, sm: 5, md: 6 }}
              maxW={{ base: "100%", md: "500px" }}
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
              noOfLines={{ base: 2, sm: 3 }}
              lineHeight="1.4"
            >
              {seriesDetail?.description}
            </Text>

            <HStack mt={5} spacing={4}>
              <Button
                leftIcon={<MdPlayArrow />}
                bg="white"
                color="black"
                cursor={"pointer"}
                _hover={{ bg: "gray.200" }}
                as={Link}
                to={`/episode/${seriesDetail.seriesSlug}/${seriesDetail.seasons?.[0]?.seasonNumber}/${seriesDetail.seasons?.[0]?.episodes?.[0]?.episodeSlug}`}
              >
                Play
              </Button>
            </HStack>
          </Box>
        </>
      </Box>

      <DescTrailer />
      {seriesDetail && (
        <Season
          seasons={seriesDetail.seasons}
          seriesSlug={seriesDetail.seriesSlug}
        />
      )}
    </Box>
  );
}
