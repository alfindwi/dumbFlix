import {
  Box,
  Center,
  Flex,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeriesSeasonEpisode } from "../../../store/episode/async";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "../footer/footer";
import { ButtonPrevNext } from "./buttonPrevNext";
import EpisodeList from "./episodeList";
import { VideoPlayer } from "./videoPlayer";

export function Episode() {
  return (
    <Box>
      <Navbar />
      <EpisodeContent />
      <Footer />
    </Box>
  );
}

export function EpisodeContent() {
  const dispatch = useAppDispatch();
  const { episode, loading } = useAppSelector(
    (state) => state.episode
  );
  const { seriesName, seasonNumber, episodeName } = useParams();
  const decodedEpisodeName = decodeURIComponent(episodeName ?? "");

  useEffect(() => {
    if (seriesName && seasonNumber && episodeName) {
      dispatch(
        getSeriesSeasonEpisode({
          seriesName,
          seasonNumber: parseInt(seasonNumber),
          episodeName: decodedEpisodeName,
        })
      );
    }
  }, [seriesName, seasonNumber, decodedEpisodeName, dispatch]);


  if (loading || !episode) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
      </Center>
    );
  }

  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="auto"
        width="100vw"
        position="relative"
        zIndex={0}
        backgroundColor="black"
      >
        <Box>
          <Flex
            justifyContent="center"
            alignItems="center"
            height="auto"
            width="100vw"
            position="relative"
            zIndex={0}
            backgroundColor="black"
            flexDirection="column"
          >
            <VideoPlayer/>

            <ButtonPrevNext />
          </Flex>
        </Box>
      </Flex>
      <Box
        ml={{ base: "10px", md: "50px", lg: "40ppx" }}
        mt={"30px"}
        mb={"50px"}
      >
        <Flex align="flex-start" direction={"row"}>
          <Box>
            <Text
              fontWeight="semibold"
              fontSize="xl"
              transition="0.2s"
              color="white"
              _groupHover={{ color: "#cb0404" }}
            >
              {episode?.episodeName}
            </Text>
            <Text fontSize="sm" color="gray.400" mb={1}>
              {episode.episodeDescription}
            </Text>
          </Box>
        </Flex>
      </Box>
      <EpisodeList
        seriesName={seriesName ?? ""}
        seasonNumber={seasonNumber ? parseInt(seasonNumber) : 0}
      />
    </Box>
  );
}
