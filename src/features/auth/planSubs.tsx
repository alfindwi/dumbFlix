"use client";

import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Img,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { PrimaryButton } from "../components/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Ponsel",
    resolution: "480p",
    price: "Rp54.000",
    quality: "Lumayan",
    devices: "Ponsel, tablet",
    screens: 1,
    downloads: 1,
    gradient: "linear(to-r, blue.600, blue.400)",
  },
  {
    name: "Dasar",
    resolution: "720p",
    price: "Rp65.000",
    quality: "Bagus",
    devices: "TV, komputer, ponsel, tablet",
    screens: 1,
    downloads: 1,
    gradient: "linear(to-r, purple.600, purple.400)",
  },
  {
    name: "Standar",
    resolution: "1080p",
    price: "Rp120.000",
    quality: "Luar biasa",
    devices: "TV, komputer, ponsel, tablet",
    screens: 2,
    downloads: 2,
    gradient: "linear(to-r, purple.500, pink.400)",
  },
  {
    name: "Premium",
    resolution: "4K + HDR",
    price: "Rp186.000",
    quality: "Terbaik",
    devices: "TV, komputer, ponsel, tablet",
    screens: 4,
    downloads: 6,
    gradient: "linear(to-r, blue.600, purple.600, red.500)",
    popular: true,
  },
];

export function SubscriptionPlans() {
  const [selected, setSelected] = useState("Ponsel");
  return (
    <Box minH="100vh" color="white">
      {/* Header */}
      <Box borderBottom="1px solid" borderColor="gray.600" py={4}>
        <Container maxW="6xl">
          <Flex justify="space-between" as={Link} to="/" align="center">
            <Img src="/src/assets/alflix.png" alt="Logo" w="180px" />
          </Flex>
        </Container>
      </Box>

      {/* Title */}
      <Container maxW="6xl" py={10}>
        <VStack spacing={2} align="start">
          <Heading fontSize="2xl">Pilih paket yang tepat untukmu</Heading>
        </VStack>
      </Container>

      <Container maxW="6xl" pb={10}>
        <Flex
          display={{ base: "flex", md: "none" }}
          overflowX="auto"
          gap={1}
          pb={2}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {plans.map((plan) => {
            const isSelected = selected === plan.name;

            return (
              <Box
                key={plan.name}
                minW="82px"
                flexShrink={0}
                border="1px solid"
                borderRadius="2xl"
                cursor="pointer"
                onClick={() => setSelected(plan.name)}
                transition="all 0.2s"
                boxShadow={
                  isSelected ? "0 0 8px rgba(255,255,255,0.8)" : "none"
                }
                position="relative"
              >
                <Box
                  bgGradient={plan.gradient}
                  color="white"
                  px={{ base: 2, md: 3 }}
                  py={{ base: 4, md: 6 }}
                  borderRadius="lg"
                  position="relative"
                >
                  <Text fontWeight="bold">{plan.name}</Text>
                  <Text fontSize="sm">{plan.resolution}</Text>

                  {isSelected && (
                    <Icon
                      as={FaRegCheckCircle}
                      boxSize={4}
                      color="white"
                      position="absolute"
                      bottom={2}
                      right={2}
                    />
                  )}
                </Box>

                {plan.popular && (
                  <Badge
                    bg="blackAlpha.700"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    position="absolute"
                    top={0}
                    right={0}
                    transform="translateY(-100%)"
                  >
                    Terpopuler
                  </Badge>
                )}
              </Box>
            );
          })}
        </Flex>

        <SimpleGrid
          display={{ base: "none", md: "grid" }}
          columns={{ base: 1, md: 4 }}
          spacing={6}
        >
          {plans.map((plan) => {
            const isSelected = selected === plan.name;

            return (
              <Box
                key={plan.name}
                border="1px solid"
                borderRadius="2xl"
                overflow="hidden"
                cursor="pointer"
                p={2}
                onClick={() => setSelected(plan.name)}
                transition="all 0.2s"
                boxShadow={
                  isSelected ? "0 0 8px rgba(255,255,255,0.8)" : "none"
                }
              >
                <Box
                  bgGradient={plan.gradient}
                  color="white"
                  px={3}
                  py={6}
                  borderRadius="lg"
                  position="relative"
                >
                  <Text fontWeight="bold">{plan.name}</Text>
                  <Text fontSize="sm">{plan.resolution}</Text>

                  {isSelected && (
                    <Icon
                      as={FaRegCheckCircle}
                      boxSize={4}
                      color="white"
                      position="absolute"
                      bottom={2}
                      right={2}
                    />
                  )}
                </Box>

                {plan.popular && (
                  <Badge
                    bg="blackAlpha.700"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    position="absolute"
                    top={0}
                    right={0}
                    transform="translateY(-100%)"
                  >
                    Terpopuler
                  </Badge>
                )}

                <VStack align="start" spacing={4} p={6} fontSize="sm">
                  <Box w="100%">
                    <Text fontWeight="medium">Harga bulanan</Text>
                    <Text>{plan.price}</Text>
                  </Box>
                  <Divider bgColor={"gray.300"} />
                  <Box w="100%">
                    <Text fontWeight="medium">Kualitas video dan suara</Text>
                    <Text>{plan.quality}</Text>
                  </Box>
                  <Divider bgColor={"gray.300"} />
                  <Box w="100%">
                    <Text fontWeight="medium">Resolusi</Text>
                    <Text>{plan.resolution}</Text>
                  </Box>
                  <Divider bgColor={"gray.300"} />
                  <Box w="100%">
                    <Text fontWeight="medium">Perangkat yang didukung</Text>
                    <Text>{plan.devices}</Text>
                  </Box>
                  <Divider bgColor={"gray.300"} />
                  <Box w="100%">
                    <Text fontWeight="medium">Perangkat di rumah tangga</Text>
                    <Text>{plan.screens}</Text>
                  </Box>
                  <Divider bgColor={"gray.300"} />
                  <Box w="100%">
                    <Text fontWeight="medium">Perangkat Download</Text>
                    <Text>{plan.downloads}</Text>
                  </Box>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>

        <Box display={{ base: "block", md: "none" }}>
          {plans
            .filter((plan) => plan.name === selected)
            .map((plan) => (
              <VStack
                key={plan.name}
                align="start"
                spacing={4}
                p={6}
                fontSize="sm"
              >
                <Box w="100%">
                  <Text fontWeight="medium">Harga bulanan</Text>
                  <Text>{plan.price}</Text>
                </Box>
                <Divider bgColor={"gray.300"} />
                <Box w="100%">
                  <Text fontWeight="medium">Kualitas video dan suara</Text>
                  <Text>{plan.quality}</Text>
                </Box>
                <Divider bgColor={"gray.300"} />
                <Box w="100%">
                  <Text fontWeight="medium">Resolusi</Text>
                  <Text>{plan.resolution}</Text>
                </Box>
                <Divider bgColor={"gray.300"} />
                <Box w="100%">
                  <Text fontWeight="medium">Perangkat yang didukung</Text>
                  <Text>{plan.devices}</Text>
                </Box>
                <Divider bgColor={"gray.300"} />
                <Box w="100%">
                  <Text fontWeight="medium">Perangkat di rumah tangga</Text>
                  <Text>{plan.screens}</Text>
                </Box>
                <Divider bgColor={"gray.300"} />
                <Box w="100%">
                  <Text fontWeight="medium">Perangkat Download</Text>
                  <Text>{plan.downloads}</Text>
                </Box>
              </VStack>
            ))}
        </Box>
      </Container>

      <Container maxW="6xl" textAlign="center" py={6}>
        <PrimaryButton size="lg" px={12} py={6}>
          Berikutnya
        </PrimaryButton>
      </Container>
    </Box>
  );
}
