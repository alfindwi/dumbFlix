import {
    AspectRatio,
    Box,
    Img,
    useBreakpointValue,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import ReactPlayer from "react-player";
import { useAppSelector } from "../../../store";

export function VideoPlayer() {
  const toast = useToast();
  const { episode } = useAppSelector((state) => state.episode);
  const { user } = useAppSelector((state) => state.auth);
  const [isPlaying, setIsPlaying] = useState(false);

  const playIconSize = useBreakpointValue({ base: "40px", md: "60px" });
  const playPadding = useBreakpointValue({ base: "8px", md: "12px" });

  const handlePlayClick = () => {
    if (!user) {
      toast({
        title: "Please login first",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsPlaying(true);
  };

  return (
    <Box width="100vw">
      {isPlaying ? (
        <AspectRatio ratio={2.2 / 1}>
          <ReactPlayer
            url={episode?.episodeVideo}
            width="100%"
            height="100%"
            playing
            controls
          />
        </AspectRatio>
      ) : (
        <>
          <Box
            width="100%"
            aspectRatio={2.2}
            position="relative"
            overflow="hidden"
          >
            <Img
              src={episode?.episodeImage}
              alt={episode?.episodeName}
              width="100%"
              height="100%"
              objectFit="cover"
              onClick={handlePlayClick}
              cursor="pointer"
              position="absolute"
              top={0}
              left={0}
            />
          </Box>
          <MdPlayArrow
            onClick={handlePlayClick}
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
        </>
      )}
    </Box>
  );
}
