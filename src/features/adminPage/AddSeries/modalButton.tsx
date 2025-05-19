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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoAttachSharp } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { useAppDispatch } from "../../../store";
import { createSeason } from "../../../store/season/async";
import { useParams } from "react-router-dom";

export function ModalButtonSeries() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { seriesName } = useParams();

  const [namaSeries, setNamaSeries] = useState<string | undefined>();
  const [seasonNumber, setSeasonNumber] = useState<string>("");

  useEffect(() => {
    if (seriesName) {
      const decoded = seriesName.replace(/-/g, " ");
      setNamaSeries(decoded);
    }
  }, [seriesName]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!namaSeries || !seasonNumber) {
      toast({
        title: "Invalid Input",
        description: "Series ID and Season Number are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const resultAction = await dispatch(
        createSeason({
          namaSeries: namaSeries,
          seasonNumber: Number(seasonNumber),
        })
      );

      if (createSeason.fulfilled.match(resultAction)) {
        toast({
          title: "Season added.",
          description: "Your season has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setSeasonNumber("");
        onCloseSsn();
      } else {
        const errorMsg =
          (resultAction.payload as string) || "Failed to add season";
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

  const {
    isOpen: isOpenEps,
    onOpen: onOpenEps,
    onClose: onCloseEps,
  } = useDisclosure();

  const {
    isOpen: isOpenSsn,
    onOpen: onOpenSsn,
    onClose: onCloseSsn,
  } = useDisclosure();
  return (
    <>
      <Flex justify="flex-end" gap={4} mt={4} mr={10}>
        <Button
          px="30px"
          onClick={onOpenSsn}
          bgColor="#E50914"
          color="white"
          _hover={{ bgColor: "#E50914", color: "white" }}
        >
          Add Season
        </Button>
        <Button
          px="30px"
          onClick={onOpenEps}
          bgColor="#E50914"
          color="white"
          _hover={{ bgColor: "#E50914", color: "white" }}
        >
          Add Episode
        </Button>
      </Flex>

      {/* epsiode */}
      <Modal isOpen={isOpenEps} onClose={onCloseEps}>
        <ModalOverlay />
        <ModalContent bgColor={"#1F1F1F"} maxWidth="50vw">
          <ModalHeader fontWeight={"bold"}>Add Episode</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center">
              <Input
                type="text"
                w={"25rem"}
                placeholder="Episode Title"
                _placeholder={{ color: "#B1B1B1" }}
                bgColor={"#343434"}
                border={"2px solid #D2D2D2"}
              />
              <InputGroup w={"180px"} ml={2}>
                <Input
                  type="file"
                  opacity="0"
                  position="absolute"
                  zIndex="2"
                  cursor="pointer"
                  w="full"
                  h="full"
                />
                <Button
                  w="full"
                  bgColor={"#343434"}
                  border={"2px solid #D2D2D2"}
                  _hover={{ bgColor: "#444444" }}
                  color="#b9b9b9"
                  justifyContent="space-between"
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  fontSize={"15px"}
                  _placeholder={{ color: "#B1B1B1" }}
                >
                  Attach Thumbnail
                  <Icon
                    as={IoAttachSharp}
                    fontSize={"25px"}
                    color={"#E50914"}
                  />
                </Button>
              </InputGroup>
            </Flex>
            <Input
              type="number"
              placeholder="Episode Number"
              _placeholder={{ color: "#B1B1B1" }}
              bgColor={"#343434"}
              border={"2px solid #D2D2D2"}
              w={"37rem"}
              mt={4}
            />
            <Input
              type="number"
              placeholder="Season Number"
              _placeholder={{ color: "#B1B1B1" }}
              bgColor={"#343434"}
              border={"2px solid #D2D2D2"}
              w={"37rem"}
              mt={4}
            />
            <Textarea
              placeholder="Episode Description"
              resize={"none"}
              h={"100px"}
              _placeholder={{ color: "#B1B1B1" }}
              bgColor={"#343434"}
              border={"2px solid #D2D2D2"}
              w={"37rem"}
              mt={4}
            />

            <InputGroup w={{ base: "100%", md: "100%" }} mt={4}>
              <Input
                type="file"
                opacity="0"
                position="absolute"
                zIndex="2"
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
                <Text fontWeight={"medium"}>Upload Video</Text>
                <Icon as={MdFileUpload} fontSize="20px" color="#E50914" />
              </Button>
            </InputGroup>
            <Flex justifyContent={"flex-end"}>
              <Button
                bgColor={"#E50914"}
                _hover={{ bgColor: "#E50914" }}
                w={"200px"}
                mb={2}
                onClick={onCloseEps}
                mt={4}
              >
                Add
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* season */}
      <Modal isOpen={isOpenSsn} onClose={onCloseSsn}>
        <ModalOverlay />
        <ModalContent bgColor={"#1F1F1F"} maxWidth="50vw">
          <ModalHeader fontWeight={"bold"}>Add Season</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                type="number"
                placeholder="Season Number"
                _placeholder={{ color: "#B1B1B1" }}
                bgColor={"#343434"}
                border={"2px solid #D2D2D2"}
                w={"37rem"}
                value={seasonNumber}
                onChange={(e) => setSeasonNumber(e.target.value)}
              />

              <Flex justifyContent={"flex-end"}>
                <Button
                  bgColor={"#E50914"}
                  _hover={{ bgColor: "#E50914" }}
                  w={"200px"}
                  type="submit"
                  mb={2}
                  mt={4}
                >
                  Save
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
