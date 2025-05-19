import { Box, Button, Flex, Icon, Img, Input, InputGroup, Text } from "@chakra-ui/react";
import { Navbar } from "../../navbar/navbar";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaTransgender } from "react-icons/fa";
import { TbVip } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

export function Profile() {
  return (
    <>
      <Navbar />
      <ProfileContent />
    </>
  );
}

export function ProfileContent() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems={{ base: "center", md: "flex-start" }}
      bgColor={"#1F1F1F"}
      w={{ base: "90vw", md: "800px" }}
      h={{ base: "auto", md: "487px" }}
      ml={{ base: "auto", md: "200px" }}
      mr={{ base: "auto", md: "0px" }}
      mt={{ base: "10px", md: "20px" }}
      mb={{ base: "30px", md: "50px" }}
      p={{ base: "20px", md: "0px" }}
      borderRadius={{ base: "10px", md: "0px" }}
      position="relative"
      zIndex={1}
    >
      <Box
        w={{ base: "100%", md: "500px" }}
        h={"auto"}
        display="flex"
        flexDirection="column"
        alignItems={{ base: "center", md: "flex-start" }}
        justifyContent="flex-start"
        p={4}
      >
        <Text color="#E50914" fontWeight="bold" fontSize={{ base: "24px", md: "30px" }}>
          Personal Info
        </Text>

        <Box ml={{ base: "0px", md: "10px" }}>
          {[{ icon: FaRegUserCircle, label: "FullName", value: "Apin Dwi" },
            { icon: FiMail, label: "Email", value: "apin@gmail.com" },
            { icon: TbVip, label: "Status", value: "Active" },
            { icon: FaTransgender, label: "Gender", value: "Male" },
            { icon: FaPhoneAlt, label: "Mobile Phone", value: "0123456789" },
            { icon: FaMapMarkerAlt, label: "Address", value: "Jl. Elang IV, Sawah Lama, Kec. Ciputat, Kota Tangerang Selatan, Banten 15413" }
          ].map((item, index) => (
            <Box key={index} display="flex" mt={"10px"} alignItems="center">
              <Icon as={item.icon} color="#E50914" fontSize={{ base: "30px", md: "40px" }} mr={3} />
              <Box>
                <Text color="white" fontSize={{ base: "16px", md: "20px" }} fontWeight="bold">
                  {item.value}
                </Text>
                <Text color="#8A8C90" fontSize={{ base: "13px", md: "15px" }}>
                  {item.label}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box position={{ base: "static", md: "absolute" }} top={{ md: "20px" }} right={{ md: "30px" }} mt={{ base: "20px", md: "0px" }}>
        <Img
          src="https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/24/2022/06/film-ryan-2.jpg"
          w={{ base: "150px", md: "250px" }}
          h={{ base: "180px", md: "290px" }}
          borderRadius={"5px"}
          objectFit={"cover"}
        />
        <InputGroup w={{ base: "150px", md: "250px" }} mt={"10px"} position="relative">
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
            bgColor={"#E50914"}
            alignItems="center"
            cursor="pointer"
            fontSize={{ base: "12px", md: "15px" }}
            _hover={{ bgColor: "#E50914" }}
          >
            Choose Photo Profile
          </Button>
        </InputGroup>
      </Box>
    </Flex>
  );
}