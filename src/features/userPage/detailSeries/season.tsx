import {
  Box,
  Button,
  Flex,
  Img,
  Select,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPlay } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ISeason } from "../../../types/season";

interface SeasonProps {
  seriesSlug: string;
  seasons: ISeason[];
}

export const Season: React.FC<SeasonProps> = ({ seasons, seriesSlug }) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(
    seasons[0]?.seasonNumber || 1
  );

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(Number(e.target.value));
  };

  const activeSeason = seasons.find(
    (season) => season.seasonNumber === selectedSeason
  );

  return (
    <Box px={{ base: "20px", md: "60px" }} py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Episodes
        </Text>
        <Select
          maxW="250px"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          {seasons.map((season) => (
            <option key={season.seasonNumber} value={season.seasonNumber}>
              Season {season.seasonNumber}
            </option>
          ))}
        </Select>
      </Flex>
          
      <Box>
        {activeSeason?.episodes.map((episode, index) => (
          <Flex
            key={index + 1}
            cursor={"pointer"}
            gap={4}
            p={4}
            borderRadius="lg"
            as={Link}
            to={`/episode/${seriesSlug}/${selectedSeason}/${episode.episodeSlug}`}
            _hover={{ bg: "gray.800" }}
            transition="background-color 0.2s ease"
            align="flex-start"
            
            mb={4}
          >
            <Text fontSize="2xl" fontWeight="bold" color="gray.400" w="32px">
              {episode.episodeNumber}
            </Text>

            <Img
              src={episode.episodeImage}
              w="128px"
              h="80px"
              objectFit="cover"
              borderRadius="md"
            />

            <Box flex="1">
              <Flex align="center" justify="space-between" mb={2}>
                <Text fontWeight="semibold">
                  Chapter {episode.episodeName}: The Vanishing of Will Byers
                </Text>
              </Flex>

              <Text fontSize="sm" color="gray.400" noOfLines={2}>
                {episode.episodeDescription}
              </Text>
            </Box>

            <Button
              variant="ghost"
              size="sm"
              borderRadius="full"
              _hover={{ bg: "gray.700" }}
              minW="40px"
              h="40px"
            >
              <BiPlay size={16} />
            </Button>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
