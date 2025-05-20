import {
  Box,
  Divider,
  Flex,
  Image,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { ISeries } from "../../../types/series";
import { IEpisode } from "../../../types/episode";
import { ISeason } from "../../../types/season";
import { Link, useParams } from "react-router-dom";

interface SeasonProps {
  seriesName: string;
  seasons: ISeason[];
}

export const Season: React.FC<SeasonProps> = ({ seasons, seriesName }) => {
  const formattedSeriesName = seriesName.replace(/\s+/g, "-");
  const { episodeName } = useParams();
  const decodedEpisodeName = decodeURIComponent(episodeName ?? "");
  const [openSeasons, setOpenSeasons] = useState<Record<number, boolean>>({});

  const toggleSeason = (seasonNumber: number) => {
    setOpenSeasons((prev) => ({
      ...prev,
      [seasonNumber]: !prev[seasonNumber],
    }));
  };

  return (
    <Box
      bgColor="black"
      ml="20px"
      mr="20px"
      p="10px"
      borderRadius="8px"
      cursor={"pointer"}
    >
      {seasons
        .slice()
        .reverse()
        .map((season) => (
          <div key={season.seasonNumber}>
            <Box
              cursor="pointer"
              fontWeight="bold"
              p="10px"
              bg="black"
              border="1px solid white"
              borderRadius="8px"
              onClick={() => toggleSeason(season.seasonNumber)}
              mb="5px"
            >
              Season {season.seasonNumber}{" "}
              {openSeasons[season.seasonNumber] ? "" : ""}
            </Box>

            <AnimatePresence>
              {openSeasons[season.seasonNumber] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <List
                    spacing={2}
                    mt={2}
                    p={2}
                    bg="#0f0e0e"
                    borderRadius="8px"
                  >
                    {season.episodes.map((episode: IEpisode, index: number) => (
                      <ListItem key={index} p={2} borderRadius="5px">
                        <Flex align="center" role="group">
                          <Image
                            src={episode.episodeImage}
                            alt={episode.episodeName}
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
                          <Box
                            as={Link}
                            to={`/episode/${formattedSeriesName}/season-${
                              season.seasonNumber
                            }/episode-${encodeURIComponent(
                              episode.episodeName
                            )}`}
                          >
                            <Text fontSize="sm" color="gray.400" mb={1}>
                              Season {season.seasonNumber} • Episode
                              {episode.episodeNumber}
                            </Text>
                            <Text
                              fontWeight="semibold"
                              fontSize="md"
                              transition="0.2s"
                              color="white"
                              _groupHover={{ color: "#cb0404" }}
                            >
                              {episode.episodeName}
                            </Text>
                          </Box>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
    </Box>
  );
};
