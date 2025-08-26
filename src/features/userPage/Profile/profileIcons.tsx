import { Box, Flex, Text } from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AvatarRow, avatars } from "./avatarRow";

export function ProfileIconsPage() {
//   const [selected, setSelected] = useState<string>(avatarOptions[0]);

//   const handleSave = () => {
//     navigate("/profile");
//   };

  return (
    <Box
      position="relative"
      w="full"
      h="100vh"
      px={2}
      py={4}
      overflowY="auto"
    >
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

      <AvatarRow title="One Piece" avatars={avatars} />
      <AvatarRow title="The Dragon Prince" avatars={avatars} />
      <AvatarRow title="Stranger Things" avatars={avatars} />
      <AvatarRow title="Arcane" avatars={avatars} />
    </Box>
  );
}
