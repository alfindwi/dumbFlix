import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCircleLeft } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdPlayArrow } from "react-icons/md";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getSeriesSeasonEpisode } from "../../../store/episode/async";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "../footer/footer";
import EpisodeList from "./episodeList";

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
  const { episode, loading } = useAppSelector((state) => state.episode);
  const { seriesName, seasonNumber, episodeName } = useParams();
  const decodedEpisodeName = decodeURIComponent(episodeName ?? "");

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const playIconSize = useBreakpointValue({ base: "40px", md: "60px" });
  const playPadding = useBreakpointValue({ base: "8px", md: "12px" });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (seriesName && seasonNumber && episodeName) {
      console.log("Dispatching getSeriesSeasonEpisode with:", {
        seriesName,
        seasonNumber: parseInt(seasonNumber),
        episodeName: decodedEpisodeName,
      });
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
            <Box width="100vw" ref={videoRef}>
              <AspectRatio ratio={2.2 / 1}>
                <ReactPlayer
                  url={episode?.episodeVideo}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls
                  light={episode?.episodeImage}
                  onClick={() => setIsPlaying(!isPlaying)}
                  playIcon={
                    <MdPlayArrow
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{
                        color: "white",
                        fontSize: playIconSize,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        border: "4px solid white",
                        padding: playPadding,
                        borderRadius: "50%",
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  }
                />
              </AspectRatio>
            </Box>

            <Flex width="100%" gap={0}>
              <Button
                flex={1}
                h="60px"
                borderRadius={0}
                fontSize="20px"
                fontWeight="semibold"
                onClick={() => console.log("Previous clicked")}
                _hover={{ color: "#cb0404" }}
                display="flex"
                bgColor={"black"}
                alignItems="center"
                justifyContent="center"
                role="group"
              >
                <Box
                  as={FaCircleLeft}
                  color="white"
                  _groupHover={{ color: "white" }}
                  mr="10px"
                  mt="2px"
                />
                Prev
              </Button>
              <Button
                flex={1}
                h="60px"
                borderRadius={0}
                fontSize="20px"
                bgColor={"black"}
                fontWeight="semibold"
                onClick={() => console.log("Previous clicked")}
                _hover={{ color: "#cb0404" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                role="group"
                as={Link}
                to={`/tvSeries`}
              >
                <Box
                  as={GiHamburgerMenu}
                  color="white"
                  _groupHover={{ color: "white" }}
                  mr="10px"
                  mt="2px"
                />
                All
              </Button>
              <Button
                flex={1}
                h="60px"
                borderRadius={0}
                fontSize="20px"
                fontWeight="semibold"
                bgColor={"black"}
                onClick={() => console.log("Previous clicked")}
                _hover={{ color: "#cb0404" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                role="group"
              >
                <Box
                  as={FaArrowAltCircleRight}
                  color="white"
                  _groupHover={{ color: "white" }}
                  mr="10px"
                  mt="2px"
                />
                Next
              </Button>
            </Flex>
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
      <EpisodeList seriesName={seriesName ?? ""} seasonNumber={seasonNumber ? parseInt(seasonNumber) : 0} />
    </Box>
  );
}
