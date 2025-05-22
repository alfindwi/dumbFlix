import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { createSeason } from "../../../store/season/async";

interface ModalButtonSeasonProps {
  isOpenSsn: boolean;
  onCloseSsn: () => void;
}

export function ModalButtonSeason({
  isOpenSsn,
  onCloseSsn,
}: ModalButtonSeasonProps) {
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

  return (
    <Modal isOpen={isOpenSsn} onClose={onCloseSsn}>
      <ModalOverlay />
      <ModalContent
        bgColor={"#1F1F1F"}
        maxW={{ base: "90vw", md: "50vw" }}
        mx="auto"
      >
        <ModalHeader fontWeight={"bold"}>Add Season</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          <form onSubmit={handleSubmit}>
            <Input
              type="number"
              placeholder="Season Number"
              _placeholder={{ color: "#B1B1B1" }}
              bgColor={"#343434"}
              border={"2px solid #D2D2D2"}
              w= {{ base: "100%", md: "100%" }}
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
  );
}
