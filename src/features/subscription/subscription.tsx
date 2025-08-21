import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import { MdTranslate } from "react-icons/md";
import { PrimaryButton } from "../components/button";
import { useTranslation } from "react-i18next";

export function Subscription() {
  const { t, i18n } = useTranslation();

  return (
    <Box
      w="100%"
      h="100vh"
      bgImage="url('/src/assets/bgPayment.avif')"
      bgSize="cover"
      bgPosition="center"
      position="relative"
    >
      <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.700" />

      <Flex
        position="relative"
        align="center"
        px={{ base: "10px", md: "80px", lg: "100px" }}
        py="30px"
        justify="space-between"
        gap={4}
      >
        <Image src="/src/assets/alflix.png" h={{ base: "18px", md: "20px", lg: "30px" }} alt="Logo" />

        <Flex align="center" gap={2}>
          <Flex
            align="center"
            bg="rgba(0,0,0,0.6)"
            border="1px solid white"
            borderRadius="md"
            px={2}
            color="white"
            w={{ base: "140px", md: "180px", lg: "200px" }}
          >
            <Box as={MdTranslate} mr={2} fontSize="18px" />

            <Select
              variant="unstyled"
              color="white"
              fontSize={{ base: "12px", md: "14px", lg: "16px" }}
              cursor="pointer"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              defaultValue={i18n.language}
              py={1}
              sx={{ appearance: "none", pr: "24px" }}
            >
              <option value="id" style={{ backgroundColor: "white", color: "black" }}>
                Bahasa Indonesia
              </option>
              <option value="en" style={{ backgroundColor: "white", color: "black" }}>
                English
              </option>
            </Select>
          </Flex>

          <PrimaryButton to="/payment">{t("button")}</PrimaryButton>
        </Flex>
      </Flex>

      <Flex
        position="relative"
        zIndex={2}
        direction="column"
        justify="center"
        align="center"
        h="60%"
        w={{ base: "90%", md: "53%" }}
        mx="auto"
        py={20}
        textAlign="center"
      >
        <Text fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }} fontWeight="extrabold" color="white">
          {t("title")}
        </Text>
        <Text fontSize={{ base: "md", md: "xl" }} mt={2} fontWeight="bold" color="white">
          {t("subtitle")}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} mt={4} color="white">
          {t("cta")}
        </Text>
      </Flex>
    </Box>
  );
}
