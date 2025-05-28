import {
  Box,
  Center,
  Divider,
  Flex,
  Img,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeriesByName } from "../../../store/series/async";

export function DescTrailer() {
  const { seriesName } = useParams();
  const dispatch = useAppDispatch();
  const { selectedSeries: seriesDetail, loading } = useAppSelector(
    (state) => state.series
  );

  const extractYouTubeId = (url: string): string => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (seriesName) {
      const decodedName = seriesName.replace(/-/g, " ");
      dispatch(getSeriesByName(decodedName));
    }

    window.scrollTo({ top: 0 });
  }, [seriesName, dispatch]);

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
    <Box ml={{ base: "10px", md: "50px", lg: "40ppx" }} mt={"30px"} mb={"50px"}>
      <Flex align="flex-start" direction={"row"}>
        <Img
          src={seriesDetail.poster}
          w={{ base: "80px", md: "90px", lg: "100px" }}
          h={{ base: "120px", md: "130px", lg: "150px" }}
          mr="20px"
          loading="lazy"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          userSelect="none"
          sx={{
            userDrag: "none",
            WebkitUserDrag: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
        />

        <Box>
          {/* Judul */}
          <Text fontSize="lg" fontWeight="bold">
            {seriesDetail.seriesName}
          </Text>

          {/* Tahun dan Kategori */}
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

          {/* Deskripsi */}
          <Text
            fontSize={{ base: "11px", md: "14px", lg: "sm" }}
            mt={3}
            w={{ base: "250px", md: "500px", lg: "450px" }}
            textAlign="justify"
            lineHeight="1.6"
          >
            {seriesDetail.description}
          </Text>
        </Box>
        <Box ml={"150px"} display={{ base: "none", md: "block", lg: "block" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${extractYouTubeId(
              seriesDetail.trailer
            )}`}
            width={"480px"}
            height={"225px"}
          />
          <Text mt={2} fontSize={"14px"}>
            Trailer : {seriesDetail.seriesName}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
