import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Img,
  Text,
  useBreakpointValue,
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
  const { episodeName, seriesName, seasonNumber } = useParams<{
    episodeName: string;
    seriesName: string;
    seasonNumber: string;
  }>();
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const { episode, loading } = useAppSelector((state) => state.episode);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // scroll saat mount

  useEffect(() => {
    if (seriesName && seasonNumber && episodeName) {
      const seasonNum = Number(seasonNumber);
      dispatch(
        getSeriesSeasonEpisode({
          seriesName,
          seasonNumber: seasonNum,
          episodeName,
        })
      );
    }
  }, [seriesName, seasonNumber, episodeName, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!episode) return <p>Episode not found</p>;

  const playIconSize = useBreakpointValue({ base: "40px", md: "60px" });
  const playPadding = useBreakpointValue({ base: "8px", md: "12px" });

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
              <AspectRatio ratio={2.75 / 1}>
                <ReactPlayer
                  url={"https://www.youtube.com/watch?v=ysz5S6PUM-U"}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls
                  light={"https://i.ytimg.com/vi/ysz5S6PUM-U/hqdefault.jpg"}
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
            <Text fontSize="2xl" color="gray.400" mb={1}>
              {episode?.seasonId} : Season {episode?.episodeName} • Episode{" "}
              {episode?.episodeNumber}
            </Text>
            <Text
              fontWeight="semibold"
              fontSize="xl"
              transition="0.2s"
              color="white"
              _groupHover={{ color: "#cb0404" }}
            >
              Pilot
            </Text>
          </Box>
        </Flex>
      </Box>
      <Flex
        align="center"
        backgroundColor="#0f0e0e"
        p={3}
        borderTop={"1px solid #363434"}
        borderBottom={"1px solid #363434"}
      >
        <Img
          src={
            "https://res.cloudinary.com/db2rr1kej/image/upload/v1747122964/DumbFlix/Thumbnail/thumbnail.jpg"
          }
          alt={"wkwkwk"}
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
            Season 1 • Episode 2
          </Text>
          <Text
            fontWeight="semibold"
            fontSize="md"
            transition="0.2s"
            color="white"
            _groupHover={{ color: "#cb0404" }}
          >
            dwidjwijd
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
