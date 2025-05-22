import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoAttachSharp } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { createEpisode } from "../../../store/episode/async";
import { getSeasonByName } from "../../../store/season/async";

interface ModalButtonEpisodeProps {
  isOpenEps: boolean;
  onCloseEps: () => void;
}

export function ModalButtonEpisode({
  isOpenEps,
  onCloseEps,
}: ModalButtonEpisodeProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { seriesName } = useParams();

  const [episodeName, setEpisodeName] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("episodeName", episodeName);
    formData.append("episodeNumber", episodeNumber.toString());
    formData.append("seasonNumber", seasonNumber.toString());
    formData.append("episodeDescription", episodeDescription);
    if (thumbnail) formData.append("thumbnail", thumbnail!);
    if (video) formData.append("video", video!);

    try {
      const resultAction = await dispatch(
        createEpisode({
          seriesName: seriesName ?? "",
          data: formData,
        })
      );

      if (createEpisode.fulfilled.match(resultAction)) {
        toast({
          title: "Episode created successfully!",
          description: "Your episode is being processed in the background.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setEpisodeName("");
        setEpisodeNumber("");
        setSeasonNumber("");
        setEpisodeDescription("");
        setThumbnail(null);
        setVideo(null);

        onCloseEps();

        if (seriesName) {
          dispatch(getSeasonByName(seriesName));
        }
      } else {
        const errorMsg =
          (resultAction.payload as string) || "Failed to add episode";
        throw new Error(errorMsg);
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpenEps} onClose={onCloseEps}>
      <ModalOverlay />
      <ModalContent
        bgColor="#1F1F1F"
        maxW={{ base: "90vw", md: "50vw" }}
        mx="auto"
      >
        <ModalHeader fontWeight="bold">Add Episode</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Flex direction={{ base: "column", md: "row" }} gap={2}>
                <Input
                  type="text"
                  placeholder="Episode Title"
                  value={episodeName}
                  onChange={(e) => setEpisodeName(e.target.value)}
                  _placeholder={{ color: "#B1B1B1" }}
                  bgColor="#343434"
                  border="2px solid #D2D2D2"
                  w="100%"
                />
                <InputGroup w="100%">
                  <Input
                    type="file"
                    opacity="0"
                    position="absolute"
                    zIndex="2"
                    cursor="pointer"
                    onChange={handleThumbnailChange}
                    w="full"
                    h="full"
                  />
                  <Button
                    w="full"
                    bgColor="#343434"
                    border="2px solid #D2D2D2"
                    _hover={{ bgColor: "#444444" }}
                    color="#b9b9b9"
                    justifyContent="space-between"
                    fontSize="15px"
                  >
                    Attach Thumbnail
                    <Icon as={IoAttachSharp} fontSize="25px" color="#E50914" />
                  </Button>
                </InputGroup>
              </Flex>

              <Input
                type="number"
                placeholder="Episode Number"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(e.target.value)}
                _placeholder={{ color: "#B1B1B1" }}
                bgColor="#343434"
                border="2px solid #D2D2D2"
                w="100%"
              />
              <Input
                type="number"
                placeholder="Season Number"
                value={seasonNumber}
                onChange={(e) => setSeasonNumber(e.target.value)}
                _placeholder={{ color: "#B1B1B1" }}
                bgColor="#343434"
                border="2px solid #D2D2D2"
                w="100%"
              />

              <Textarea
                placeholder="Episode Description"
                value={episodeDescription}
                onChange={(e) => setEpisodeDescription(e.target.value)}
                resize="none"
                h="100px"
                _placeholder={{ color: "#B1B1B1" }}
                bgColor="#343434"
                border="2px solid #D2D2D2"
                w="100%"
              />

              <InputGroup>
                <Input
                  type="file"
                  opacity="0"
                  position="absolute"
                  zIndex="2"
                  onChange={handleVideoChange}
                  cursor="pointer"
                  w="full"
                  h="full"
                />
                <Button
                  w="full"
                  bgColor="#343434"
                  border="2px solid #D2D2D2"
                  _hover={{ bgColor: "#444444" }}
                  color="#b9b9b9"
                  fontSize="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Text fontWeight="medium">Upload Video</Text>
                  <Icon as={MdFileUpload} fontSize="20px" color="#E50914" />
                </Button>
              </InputGroup>

              <Flex justify="flex-end">
                <Button
                  bgColor="#E50914"
                  type="submit"
                  _hover={{ bgColor: "#E50914" }}
                  w={{ base: "100%", md: "200px" }}
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
