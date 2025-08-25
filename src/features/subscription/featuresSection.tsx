import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import {
    FaFilm,
    FaGlobe,
    FaLaptop,
    FaUserFriends
} from "react-icons/fa";

export function FeaturesSection() {
  const features = [
    {
      title: "Akses dari Browser",
      desc: "Nikmati semua konten langsung dari browser favoritmu tanpa perlu instalasi aplikasi tambahan.",
      icon: FaGlobe,
    },
    {
      title: "Streaming di Laptop & PC",
      desc: "Tonton film dan acara TV berkualitas tinggi langsung di layar laptop atau komputer.",
      icon: FaLaptop,
    },
    {
      title: "Buat Profil untuk Keluarga",
      desc: "Atur profil terpisah untuk setiap anggota keluarga agar pengalaman menonton lebih personal.",
      icon: FaUserFriends,
    },
    {
      title: "Konten Selalu Baru",
      desc: "Nikmati tayangan terbaru dengan update rutin agar kamu tidak pernah kehabisan tontonan.",
      icon: FaFilm,
    },
  ];

  return (
    <Box bg="black" py={4} px={{ base: 5, md: 20 }}>
      <Text
        color="white"
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "3xl" }}
        mb={10}
      >
        Alasan Lainnya untuk Bergabung
      </Text>

      <Flex wrap="wrap" justify="center" gap={6}>
        {features.map((f, i) => (
          <Box
            key={i}
            bgGradient="linear(to-b, #141432, #1a0f18)"
            borderRadius="2xl"
            p={6}
            flex="1 1 250px"
            maxW="300px"
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minH="300px"
          >
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={3}>
                {f.title}
              </Text>
              <Text color="gray.300" fontSize="sm">
                {f.desc}
              </Text>
            </Box>
            <Box mt={5} alignSelf="flex-end">
              <Icon as={f.icon} boxSize={10} color="pink.400" />
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
