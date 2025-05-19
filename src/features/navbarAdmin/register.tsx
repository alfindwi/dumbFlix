import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";

export function Register() {
  return (
    <Box bgColor={"black"}>
      <Box ml={"20px"} mr={"20px"}>
        <Input placeholder="Email" type="email" size="md" mb={2} />
        <Input placeholder="Password" type="password" size="md" mb={2} />
        <Input placeholder="Full Name" type="text" size="md" mb={2} />
        <Select mb={2}>
          <option value="" disabled>
            Selected Gender
          </option>
          <option value="">Man</option>
          <option value="">Woman</option>
        </Select>
        <Input placeholder="Phone" type="number" size="md" mb={2} />
        <Input placeholder="Address" type="text" size="md" mb={2} />

        <Button
          mt={4}
          w={"100%"}
          bgColor={"#E50914"}
          _hover={{ bgColor: "white", color: "#E50914" }}
        >
          Register
        </Button>
        <Flex mt={2} justifyContent={"center"} mb={4}>
          <Text color={"#B1B1B1"}>
            Already have an account ? Klik{" "}
            <span style={{ fontWeight: "bold", cursor: "pointer" }}>Here</span>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
