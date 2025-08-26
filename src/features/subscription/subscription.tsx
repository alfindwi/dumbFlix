import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdTranslate } from "react-icons/md";
import { PrimaryButton } from "../components/button";
import { FaChevronRight } from "react-icons/fa";
import { FeaturesSection } from "./featuresSection";
import { FAQ } from "./faqSection";

export function Subscription() {
  const { t, i18n } = useTranslation();

  return (
    <Box
      w="100%"
      bgImage="url('/src/assets/bgPayment.avif')"
      bgSize="contain"
      bgPosition="center"
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h={i18n.language === "id" ? "780px" : "740px"}
        bg="blackAlpha.700"
      />

      <Flex
        position="relative"
        align="center"
        px={{ base: "10px", md: "80px", lg: "100px" }}
        py="30px"
        justify="space-between"
        gap={4}
      >
        <Image
          src="/src/assets/alflix.png"
          h={{ base: "18px", md: "20px", lg: "30px" }}
          alt="Logo"
        />

        <Flex align="center" gap={2}>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              color="white"
              borderColor="white"
              bg="black"
              _hover={{ bg: "gray.800" }}
              px={3}
              rightIcon={<IoMdArrowDropdown />}
              minW={{ base: "50px", md: "210px" }}
              justifyContent="space-between"
            >
              <Flex align="center" gap={2}>
                <MdTranslate />
                <Text display={{ base: "none", md: "block" }}>
                  {i18n.language === "id" ? "Bahasa Indonesia" : "English"}
                </Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => i18n.changeLanguage("id")}>
                Bahasa Indonesia
              </MenuItem>
              <MenuItem onClick={() => i18n.changeLanguage("en")}>
                English
              </MenuItem>
            </MenuList>
          </Menu>

          <PrimaryButton to="/login">{t("button")}</PrimaryButton>
        </Flex>
      </Flex>

      <Flex
        position="relative"
        zIndex={2}
        direction="column"
        justify="center"
        align="center"
        minH={{ base: "450px", md: "400px", lg: "350px" }} 
        w={{ base: "90%", md: "70%", lg: "40%" }}
        mx="auto"
        py={20}
        textAlign="center"
      >
        <Text
          fontSize={{ base: "4xl", md: "5xl", lg: "5xl" }}
          fontWeight="extrabold"
          color="white"
        >
          {t("title")}
        </Text>
        <Text fontSize="xl" mt={2} color="white">
          {t("subtitle")}
        </Text>
        <Text
          fontSize={{ base: "md", md: "20px", lg: "lg" }}
          mt={2}
          color="white"
        >
          {t("cta")}
        </Text>

        <Flex
          w="100%"
          mt={3}
          gap={3}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "stretch" }}
        >
          <Input
            flex="1"
            bg="gray.700"
            placeholder="Alamat Email"
            color="white"
            padding={"18px"}
            w="100%"
            _placeholder={{
              color: "gray.400",
              opacity: 1,
            }}
            type="email"
            size="lg"
          />
          <Button
            size="lg"
            bg="#e50914"
            color="white"
            fontWeight="bold"
            px={8}
            _hover={{ bg: "#b20710" }}
            rightIcon={<FaChevronRight />}
          >
            {t("button")}
          </Button>
        </Flex>
      </Flex>
      <Box position="relative" w="100%" mt={{ base: "100px", md: "150px" }}>
        <Box
          position="absolute"
          bottom={0}
          left={0}
          w="100%"
          h="120px"
          bgGradient="linear(to-t, #000000ff 0%, transparent 80%)"
          clipPath="ellipse(75% 100% at 50% 100%)"
        />
      </Box>
      <FeaturesSection />
      <FAQ />
    </Box>
  );
}
