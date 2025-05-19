import {
  AspectRatio,
  Box,
  Flex,
  useBreakpointValue
} from "@chakra-ui/react";
import { useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import ReactPlayer from "react-player";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "../footer/footer";
import { DescTrailer } from "./descriptionTrailer";
import { Season } from "./season";

export function DetailSeries() {
  return (
    <Box>
      <Navbar />
      <DetailSeriesContent />
      <Footer />
    </Box>
  );
}

export function DetailSeriesContent() {
  const [isPlaying, setIsPlaying] = useState(false);

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
        backgroundColor="black"
      >
        <Box width="100vw" mt={"20px"}>
          <AspectRatio ratio={12 / 6}>  
            <ReactPlayer
              url="https://res.cloudinary.com/db2rr1kej/video/upload/v1736305697/kxv5vcqzmw6c8nvk4zf9.mp4"
              width="100%"
              height="100%"
              playing={isPlaying}
              controls
              light="https://image.tmdb.org/t/p/original/ydlY3iPfeOAvu8gVqrxPoMvzNCn.jpg"
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
      </Flex>
      <DescTrailer />
      <Season />
    </Box>
  );
}


