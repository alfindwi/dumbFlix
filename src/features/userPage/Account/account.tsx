import {
  Box,
  Heading,
  Text,
  Divider,
  Flex,
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Account() {
  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onClose: onPasswordClose,
  } = useDisclosure();

  const {
    isOpen: isPhoneOpen,
    onOpen: onPhoneOpen,
    onClose: onPhoneClose,
  } = useDisclosure();

  return (
    <Box position="relative" w="full" h="100vh" px={8} py={4} overflowY="auto">
      <Flex
        align="center"
        gap={3}
        as={Link}
        mb={6}
        position="sticky"
        to={"/dashboard"}
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
            Account
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="medium"
            color="gray.300"
          >
            Manage your account
          </Text>
        </Flex>
      </Flex>

      <Box>
        <Heading size="md" mb={2}>
          Membership & Billing
        </Heading>
        <Divider mb={4} />

        <Flex justify="space-between" align="center" mb={2}>
          <Box>
            <Text fontWeight="bold">alfin@example.com</Text>
            <Text>Password: ********</Text>
            <Text>Phone: +62 812-3456-7890</Text>
          </Box>
          <Stack spacing={2}>
            <Button variant="outline" onClick={onPasswordOpen} size="sm">
              Change Password
            </Button>
            <Button variant="outline" onClick={onPhoneOpen} size="sm">
              Manage Phone
            </Button>
          </Stack>
        </Flex>

        <Divider my={4} />

        <Flex justify="space-between" align="center" mb={2}>
          <Box>
            <Text fontWeight="bold">Visa •••• 1234</Text>
            <Text>Next Billing Date: 01 September 2025</Text>
          </Box>
          <Stack spacing={2}>
            <Button variant="outline" size="sm">
              Manage Payment Info
            </Button>
            <Button variant="outline" size="sm">
              Add Backup Payment
            </Button>
            <Button variant="outline" size="sm">
              Billing Details
            </Button>
          </Stack>
        </Flex>
      </Box>

      <Box mt={8}>
        <Heading size="md" mb={2}>
          Plan Details
        </Heading>
        <Divider mb={4} />
        <Flex justify="space-between" align="center">
          <Text>Premium • 4K + HDR</Text>
          <Button variant="outline" size="sm">
            Change Plan
          </Button>
        </Flex>
      </Box>

      <Modal isOpen={isPasswordOpen} onClose={onPasswordClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3}>
              <Input placeholder="Current Password" type="password" />
              <Input placeholder="New Password" type="password" />
              <Input placeholder="Confirm New Password" type="password" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onPasswordClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Manage Phone */}
      <Modal isOpen={isPhoneOpen} onClose={onPhoneClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Phone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Enter phone number" type="tel" />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onPhoneClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
