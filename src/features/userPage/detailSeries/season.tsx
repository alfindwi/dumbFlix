import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Text,
  Divider,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { seasons } from "./jsonSeries";

export function Season() {
  const [openSeasons, setOpenSeasons] = useState<Record<number, boolean>>({});

  const toggleSeason = (seasonNumber: number) => {
    setOpenSeasons((prev) => ({
      ...prev,
      [seasonNumber]: !prev[seasonNumber],
    }));
  };

  return (
    <Box bgColor="black" ml="20px" mr="20px" p="10px" borderRadius="8px" cursor={"pointer"}>
      {seasons
        .slice()
        .reverse()
        .map((season) => (
          <div key={season.season}>
            <Box
              cursor="pointer"
              fontWeight="bold"
              p="10px"
              bg="black"
              border="1px solid white"
              borderRadius="8px"
              onClick={() => toggleSeason(season.season)}
              mb="5px"
            >
              Season {season.season} {openSeasons[season.season] ? "" : ""}
            </Box>

            <AnimatePresence>
              {openSeasons[season.season] && (
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
                    {season.episodes.map((episode, index) => (
                      <ListItem key={index} p={2} borderRadius="5px">
                        <Flex align="center">
                          <Image
                            src={episode.image}
                            alt={episode.title}
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

                          <Text fontWeight="bold">
                            Episode {index + 1} : {episode.title}
                          </Text>
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
}
