"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../features/components/button";
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateUser } from "../../../store/user/async";
import { IUser } from "../../../types/user";

export function ProfileContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { users, loading } = useAppSelector((state) => state.user);

  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState("");

  

  useEffect(() => {
    if (users) {
      setFullName(users.fullName || "");
      setImage(users.image || "");
    }
  }, [users]);

  useEffect(() => {
    if (location.state?.selectedAvatar) {
      setImage(location.state.selectedAvatar);
    }
  }, [location.state]);

  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Box
        position="relative"
        zIndex={10}
        w="full"
        maxW="500px"
        textAlign="center"
        p={8}
        borderRadius="lg"
        bg="blackAlpha.700"
      >
        <Box mb={8}>
          <Text
            fontSize={{ base: "2xl", md: "2xl" }}
            fontWeight="bold"
            color="white"
            mb={2}
          >
            Manage Profile
          </Text>
          <Box w="50px" h="3px" bg="red.600" mx="auto" borderRadius="full" />
        </Box>

        <Flex justify="center" mb={6}>
          <Box
            as="button"
            onClick={() => navigate("/profile-icons")}
            w="96px"
            h="96px"
            borderRadius="lg"
            overflow="hidden"
            border="3px solid"
            borderColor="red.600"
            position="relative"
            cursor="pointer"
            transition="all 0.3s"
            _hover={{
              borderColor: "red.500",
              boxShadow: "0 0 15px rgba(229,9,20,0.4)",
            }}
          >
            <Image
              src={image || ""}
              alt="Profile"
              w="full"
              h="full"
              objectFit="cover"
              transition="transform 0.3s"
              _hover={{ transform: "scale(1.05)" }}
            />

            <Flex
              position="absolute"
              inset={0}
              bg="blackAlpha.600"
              opacity={0}
              align="center"
              justify="center"
              transition="opacity 0.3s"
              _hover={{ opacity: 1 }}
            >
              <MdOutlineEdit size={24} color="white" />
            </Flex>
          </Box>
        </Flex>

        <VStack spacing={5}>
          <Box w="full" textAlign="left">
            <Text color="gray.300" fontSize="sm" mb={2} fontWeight="medium">
              Profile Name
            </Text>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Name"
              bg="gray.800"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: "gray.400" }}
              h="40px"
              fontSize="md"
              _focus={{
                borderColor: "red.600",
                boxShadow: "0 0 0 1px #E50914",
              }}
            />
          </Box>

          <Flex gap={3} w="full" pt={2}>
            <PrimaryButton
              flex={1}
              color="white"
              h="40px"
              fontSize="md"
              fontWeight="semibold"
              boxShadow="md"
              leftIcon={<BiCheck size={18} />}
              isLoading={loading}
              onClick={() => {
                dispatch(updateUser({ ...users, fullName, image } as IUser))
                  .unwrap()
                 
              }}
            >
              Save
            </PrimaryButton>
            <Button
              flex={1}
              variant="outline"
              borderColor="gray.600"
              color="gray.300"
              _hover={{ bg: "gray.800", color: "white" }}
              h="40px"
              fontSize="md"
              fontWeight="semibold"
              onClick={() => {
                setFullName(users?.fullName || "");
                setImage(users?.image || "");
              }}
              leftIcon={<BiX size={18} />}
            >
              Cancel
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
