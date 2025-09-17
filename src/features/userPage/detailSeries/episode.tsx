import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeriesSeasonEpisode } from "../../../store/episode/async";
import { ButtonPrevNext } from "./buttonPrevNext";
import EpisodeList from "./episodeList";
import { VideoPlayer } from "./videoPlayer";

export function EpisodeContent() {
  const dispatch = useAppDispatch();
  const { episode, loading } = useAppSelector((state) => state.episode);
  const { seriesSlug, seasonNumber, episodeSlug } = useParams();

  useEffect(() => {
    if (seriesSlug && seasonNumber && episodeSlug) {
      dispatch(
        getSeriesSeasonEpisode({
          seriesSlug,
          seasonNumber: parseInt(seasonNumber),
          episodeSlug,
        })
      );
    }
  }, [seriesSlug, seasonNumber, episodeSlug, dispatch]);

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
            {episode?.episodeName}
          </Text>
        </Flex>
      </Flex>

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
            <VideoPlayer />
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
        seriesName={seriesSlug ?? ""}
        seasonNumber={seasonNumber ? parseInt(seasonNumber) : 0}
      />
    </Box>
  );
}
