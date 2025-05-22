import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCircleLeft } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../store";

export function ButtonPrevNext() {
  const navigate = useNavigate();
  const { episodes } = useAppSelector((state) => state.episode);
  const { seriesName, seasonNumber, episodeName } = useParams();
  const decodedEpisodeName = decodeURIComponent(episodeName ?? "");
  function normalize(text?: string) {
    if (!text) return ""; 
    return text.toLowerCase().trim().replace(/\s+/g, "-");
  }

  const sortedEpisodes = [...(episodes || [])].sort(
    (a, b) => a.episodeNumber - b.episodeNumber
  );

  const currentIndex = sortedEpisodes.findIndex(
    (ep) => normalize(ep.episodeName) === normalize(decodedEpisodeName)
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [episodeName]);

  if (!episodes || episodes.length === 0 || currentIndex === -1) return null;
  return (
    <Flex width="100%" gap={0}>
      <Button
        flex={1}
        h="60px"
        borderRadius={0}
        fontSize="20px"
        fontWeight="semibold"
        isDisabled={currentIndex <= 0}
        onClick={() => {
          if (currentIndex > 0) {
            const prevEpisode = sortedEpisodes[currentIndex - 1];
            navigate(
              `/episode/${seriesName}/${seasonNumber}/${encodeURIComponent(
                prevEpisode.episodeName.replace(/\s+/g, "-")
              )}`
            );
          }
        }}
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
        to={`/series/${seriesName}`}
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
        isDisabled={currentIndex >= sortedEpisodes.length - 1}
        bgColor={"black"}
        onClick={() => {
          if (currentIndex < sortedEpisodes.length - 1) {
            const nextEpisode = sortedEpisodes[currentIndex + 1];
            navigate(
              `/episode/${seriesName}/${seasonNumber}/${encodeURIComponent(
                nextEpisode.episodeName.replace(/\s+/g, "-")
              )}`
            );
          }
        }}
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
  );
}
