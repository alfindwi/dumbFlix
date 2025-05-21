import { Box, Center, Divider, Flex, Img, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getEpisodeBySeason } from "../../../store/episode/async";

export default function EpisodeList({
  seriesName,
  seasonNumber,
}: {
  seriesName: string;
  seasonNumber: number;
}) {
  const dispatch = useAppDispatch();
  const { episodes, loading } = useAppSelector((state) => state.episode);

  useEffect(() => {
    if (episodes.length === 0) {
      dispatch(getEpisodeBySeason({ seriesName, seasonNumber }));
    }
  }, [seriesName, seasonNumber, dispatch]);

  if (loading) {
      return (
        <Center h="100vh">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="red.500" />
        </Center>
      );
    }

  return (
    <Box>
      {episodes.map((ep) => (
        <Flex
          key={ep.id}
          align="center"
          backgroundColor="#0f0e0e"
          p={3}
          borderTop={"1px solid #363434"}
          borderBottom={"1px solid #363434"}
          cursor="pointer"
          _hover={{ bg: "#1a1919" }}
          onClick={() => {
            window.location.href = `/episode/${seriesName}/${seasonNumber}/${encodeURIComponent(
              ep.episodeName
            )}`;
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
            <Text fontWeight="semibold" fontSize="md" color="white">
              {ep.episodeName}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}
