import {
  Button,
  Flex,
  useDisclosure
} from "@chakra-ui/react";
import { ModalButtonEpisode } from "./buttonEpisode";
import { ModalButtonSeason } from "./buttonSeason";

export function ModalButton() {
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

      <ModalButtonEpisode isOpenEps={isOpenEps} onCloseEps={onCloseEps} />

      <ModalButtonSeason isOpenSsn={isOpenSsn} onCloseSsn={onCloseSsn} />
    </>
  );
}
