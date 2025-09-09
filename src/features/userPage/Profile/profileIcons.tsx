import { useAppDispatch, useAppSelector } from "../../../store";
import { getAvatar } from "../../../store/avatar/async";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export function ProfileIconsPage() {
  const dispacth = useAppDispatch();
  const navigate = useNavigate();
  const handleSelected = (avatar: string) => {
    navigate("/profile", { state: { selectedAvatar: avatar } });
  };

  const { avatars } = useAppSelector((state) => state.avatar);

  useEffect(() => {
    dispacth(getAvatar());
  }, [dispacth]);

  return (
    <Box position="relative" w="full" h="100vh" px={2} py={4} overflowY="auto">
      <Flex
        align="center"
        gap={3}
        as={Link}
        to="/profile"
        mb={6}
        position="sticky"
        top={-5}
        zIndex={10}
        bg="blackAlpha.800"
        py={3}
      >
        <FaArrowLeftLong color="white" size={22} cursor="pointer" />
        <Flex direction="column" align="start">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="white"
          >
            Edit Profile
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="medium"
            color="gray.300"
          >
            Choose a profile icon.
          </Text>
        </Flex>
      </Flex>

      {avatars.map((group, i) => (
        <Box key={i} mb={8} px={8}>
          <Text fontSize="xl" fontWeight="bold" color="white" mb={4}>
            {group.title}
          </Text>

          <Flex wrap="wrap" gap={6}>
            {group.image.map((src, idx) => (
              <Box
                key={idx}
                w="140px"
                onClick={() => handleSelected(src)}
                h="140px"
                borderRadius="md"
                overflow="hidden"
                border="3px solid transparent"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.05)", borderColor: "#E50914" }}
              >
                <Img
                  src={src}
                  alt={`${group.title} ${idx}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
