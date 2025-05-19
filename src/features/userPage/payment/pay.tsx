import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { IoIosAttach } from "react-icons/io";
import { Navbar } from "../../navbar/navbar";

export function Payment() {
  return (
    <>
      <Navbar />
      <PayContent />
    </>
  );
}

export function PayContent() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      textAlign="center"
      mt={{ base: "50px" }}
    >
      <Box p={4} maxW={{ base: "90vw", md: "400px" }}>
        <Text fontSize={{ base: "30px", md: "40px" }} mb={4} fontWeight="bold">
          Premium
        </Text>
        <Text fontSize={{ base: "16px", md: "20px" }}>
          Bayar sekarang dan nikmati streaming film-film yang kekinian dari{" "}
          <span style={{ color: "#E50914", fontWeight: "bold" }}>DUMBFLIX</span>
        </Text>
        <Text fontSize={{ base: "16px", md: "20px" }} mt={2}>
          <span style={{ color: "#E50914", fontWeight: "bold" }}>DUMBFLIX</span>{" "}
          0123456789
        </Text>
        <Input
          type="number"
          w={{ base: "100%", md: "300px" }}
          mt={4}
          placeholder="Input your account number"
          h={{ base: "45px", md: "50px" }}
          color="white"
          bgColor="#343434"
          border="2px solid #D2D2D240"
          _placeholder={{ color: "#b9b9b9" }}
        />
        <Box mt={4} w={{ base: "100%", md: "300px" }}>
          <Input type="file" id="profile-picture" display="none" />
          <label htmlFor="profile-picture">
            <Button
              as="span"
              cursor="pointer"
              _hover={{ bg: "white" }}
              width="100%"
              display="flex"
              justifyContent="space-between"
              bgColor="white"
              color="#E50914"
              fontWeight="bold"
              alignItems="center"
              p={3}
            >
              <Text fontSize={{ base: "14px", md: "16px" }}>
                Attach proof of transfer
              </Text>
              <Icon as={IoIosAttach} boxSize={5} />
            </Button>
          </label>
        </Box>
        <Button
          w={{ base: "100%", md: "300px" }}
          bgColor="#E50914"
          fontWeight="bold"
          mt={6}
          fontSize={{ base: "16px", md: "18px" }}
        >
          Kirim
        </Button>
      </Box>
    </Flex>
  );
}
