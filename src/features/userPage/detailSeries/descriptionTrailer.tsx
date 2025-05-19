import {
    Box,
    Flex,
    Img,
    Text
} from "@chakra-ui/react";
import ReactPlayer from "react-player";

export function DescTrailer() {
  return (
    <Box ml={{ base: "10px", md: "50px", lg: "40ppx" }} mt={"30px"} mb={"50px"}>
      <Flex align="flex-start" direction={"row"}>
        <Img
          src="https://image.tmdb.org/t/p/w185/ggFHVNu6YYI5L9pCfOacjizRGt.jpg"
          w={{ base: "80px", md: "90px", lg: "100px" }}
          h={{ base: "120px", md: "130px", lg: "150px" }}
          mr="20px"
        />
        <Box>
          {/* Judul */}
          <Text fontSize="lg" fontWeight="bold">
            Breaking Bad
          </Text>

          {/* Tahun dan Kategori */}
          <Flex align="center" mt={2}>
            <Text fontSize="sm" color="#929292" mr={4}>
              2013
            </Text>
            <Flex
              bgColor="transparent"
              border="1px solid #929292"
              borderRadius="3px"
              fontSize="14px"
              p={1}
              w={"70px"}
              h={"27px"}
              justifyContent={"center"}
              alignItems={"center"}
              color={"#929292"}
            >
              Tv Series
            </Flex>
          </Flex>

          {/* Deskripsi */}
          <Text
            fontSize={{ base: "11px", md: "14px", lg: "sm" }}
            mt={3}
            w={{ base: "250px", md: "500px", lg: "450px" }}
            textAlign="justify"
            lineHeight="1.6"
          >
            Breaking Bad menceritakan kisah seorang guru kimia SMA bernama
            Walter White (Bryan Cranston) yang didiagnosa kanker paru-paru,
            bersama mantan muridnya Jesse Pinkman (Aaron Paul), terjun ke dunia
            kejahatan dengan memproduksi dan menjual kristal metamfetamin untuk
            menjamin masa depan keuangan keluarganya sebelum ia meninggal.
          </Text>
        </Box>
        <Box ml={"150px"} display={{base: "none", md: "block", lg: "block"}}>
          <ReactPlayer
            url={"https://youtu.be/HhesaQXLuRY?si=StuZVQLi5a0-kf_W"}
            width={"480px"}
            height={"225px"}
          />
          <Text mt={2} fontSize={"14px"}>
            Breaking Bad
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
