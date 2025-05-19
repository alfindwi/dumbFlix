import { Box, Center, Flex, Icon, Img, Spinner, Text } from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { ModalButtonSeries } from "./modalButton";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getSeriesByName } from "../../../store/series/async";

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

  const seriesDetail = Array.isArray(series) ? series[0] : series;

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (seriesName) {
      dispatch(getSeriesByName(seriesName));
    }
  }, [seriesName, dispatch]);

  useEffect(() => {
    if (seriesDetail?.seriesName) {
      document.title = `${seriesDetail.seriesName} - ALFLIX`;
    }
    return () => {
      document.title = "ALFLIX";
    };
  }, [seriesDetail?.seriesName]);

  if (loading || !series) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }
  return (
    <Box>
      <ModalButtonSeries />
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

            {/* Deskripsi */}

            <Text
              fontSize="sm"
              mt={3}
              w="450px"
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
    </Box>
  );
}
