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

interface ModalButtonEpisodeProps {
  isOpenEps: boolean;
  onCloseEps: () => void;
}

export function ModalButtonEpisode({ isOpenEps, onCloseEps }: ModalButtonEpisodeProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { seriesName } = useParams();
  

  return (
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
              >
                Attach Thumbnail
                <Icon as={IoAttachSharp} fontSize={"25px"} color={"#E50914"} />
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
          <InputGroup w="full" mt={4}>
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
  );
}
