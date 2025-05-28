import { Box, Center, Divider, Flex, Img, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeriesByName } from "../../../store/series/async";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { ModalButton } from "./modalButtonSeason";
import { SeasonAdmin } from "./seasonAdmin";

export function DetailSeriesAdmin() {
  return (
    <Box>
      <NavbarAdmin />
      <DetailSeriesTrailer />
    </Box>
  );
}

export function DetailSeriesTrailer() {
  const { seriesName } = useParams();
  const dispatch = useAppDispatch();
  const { series, loading } = useAppSelector((state) => state.series);

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  const decodedSeriesName = seriesName?.replace(/-/g, " ");

  const seriesDetail = Array.isArray(series)
    ? series.find((item) => item.seriesName === decodedSeriesName)
    : series;

  useEffect(() => {
    if (decodedSeriesName) {
      dispatch(getSeriesByName(decodedSeriesName));
    }
  }, [decodedSeriesName, dispatch]);

  useEffect(() => {
    if (seriesDetail?.seriesName) {
      document.title = `${seriesDetail.seriesName} - ALFLIX`;
    }
    return () => {
      document.title = "ALFLIX";
    };
  }, [seriesDetail?.seriesName]);

  if (loading || !seriesDetail) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }
  return (
    <Box>
      <ModalButton />
      <Box ml={"40px"} mt={"20px"} mb={"50px"}>
        <Flex align="flex-start" direction={"row"}>
          <Img
            src={seriesDetail.poster}
            alt={seriesDetail.seriesName}
            w="100px"
            h="150px"
            mr="20px"
          />
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              {seriesDetail.seriesName}
            </Text>

            <Flex align="center" mt={2}>
              <Text fontSize="sm" color="#929292" mr={4}>
                {seriesDetail.seriesYear}
              </Text>
              <Flex
                bgColor="transparent"
                border="1px solid #929292"
                borderRadius="3px"
                fontSize="14px"
                p={1}
                w={"70px"}
                h={"27px"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"#929292"}
              >
                Tv Series
              </Flex>
            </Flex>
            <Flex gap={2} mt={2} flexWrap="wrap" fontSize="12px">
              {Array.isArray(seriesDetail.categories) &&
                seriesDetail.categories.map((cat, index) => (
                  <Flex key={cat.id} align="center" color="#929292">
                    <Text>{cat.categoryName}</Text>
                    {index !== seriesDetail.categories.length - 1 && (
                      <Divider
                        ml={1}
                        orientation="vertical"
                        borderColor="#363434"
                        height="10px"
                      />
                    )}
                  </Flex>
                ))}
            </Flex>

            <Text
              fontSize="sm"
              mt={3}
              w={{ base: "200px", md: "300px", lg: "500px" }}
              textAlign="justify"
              lineHeight="1.6"
            >
              {seriesDetail.description}
            </Text>
          </Box>
          <Box ml="180px">
            <Box
              as="iframe"
              width="400px"
              height="200px"
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                seriesDetail.trailer
              )}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              border="none"
            />
            <Text mt={2} fontSize="14px">
              Trailer {seriesDetail.seriesName}
            </Text>
          </Box>
        </Flex>
      </Box>
      <SeasonAdmin />
    </Box>
  );
}
