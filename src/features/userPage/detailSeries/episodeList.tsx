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
import { useAppDispatch, useAppSelector } from "../../../store";
import { getEpisodeBySeason } from "../../../store/episode/async";
import { useParams } from "react-router-dom";

export default function EpisodeList({
  seriesName,
  seasonNumber,
}: {
  seriesName: string;
  seasonNumber: number;
}) {
  const dispatch = useAppDispatch();
  const { episodeName } = useParams();
  const { episodes, loading, currentSeriesName, currentSeasonNumber } =
    useAppSelector((state) => state.episode);

  useEffect(() => {
    if (
      currentSeriesName !== seriesName ||
      currentSeasonNumber !== seasonNumber
    ) {
      dispatch(getEpisodeBySeason({ seriesName, seasonNumber }));
    }
  }, [
    seriesName,
    seasonNumber,
    currentSeriesName,
    currentSeasonNumber,
    dispatch,
  ]);


  if (
    loading ||
    currentSeriesName !== seriesName ||
    currentSeasonNumber !== seasonNumber
  ) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box>
      {episodes.map((ep) => {
        const isCurrentEpisode = episodeName === ep.episodeSlug;

        return (
          <Flex
            key={ep.id}
            align="center"
            role="group"
            backgroundColor={isCurrentEpisode ? "#1a1919" : "#0f0e0e"}
            p={3}
            borderTop={"1px solid #363434"}
            borderBottom={"1px solid #363434"}
            cursor={isCurrentEpisode ? "default" : "pointer"}
            _hover={isCurrentEpisode ? {} : { bg: "#1a1919" }}
            opacity={isCurrentEpisode ? 0.5 : 1}
            onClick={() => {
              if (!isCurrentEpisode) {
                window.location.href = `/episode/${seriesName}/${seasonNumber}/${encodeURIComponent(
                  ep.episodeName.replace(/\s+/g, "-")
                )}`;
              }
            }}
          >
            <Img
              src={ep.episodeImage}
              alt={ep.episodeName}
              borderRadius="5px"
              w="100px"
              mr={3}
            />

            <Divider
              orientation="vertical"
              borderColor="#363434"
              height="30px"
              mr={3}
              ml={3}
            />

            <Box>
              <Text fontSize="sm" color="gray.400" mb={1}>
                Season {seasonNumber} • Episode {ep.episodeNumber}
              </Text>
              <Text
                fontWeight="semibold"
                fontSize="md"
                color={"white"}
                _groupHover={
                  isCurrentEpisode ? { color: "white" } : { color: "#cb0404" }
                }
              >
                {ep.episodeName}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}
