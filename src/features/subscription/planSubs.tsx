import { useAppDispatch, useAppSelector } from "../../store";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  Img,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/button";
import { getPlans } from "../../store/plans/async";
import Cookies from "js-cookie";
import { createPayment } from "../../store/payment/async";
import api from "../../libs/api";

export function SubscriptionPlans() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("Basic");

  const { plans } = useAppSelector((state) => state.plan);
  const { payment, loading, error } = useAppSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);

const handleSubmit = async () => {
  const selectedPlan = plans.find((plan) => plan.name === selected);
  if (!selectedPlan) return;

  try {
    const result = await dispatch(createPayment(selectedPlan.planId)).unwrap();

    if (result.token) {
      (window as any).snap.pay(result.token, {
        onSuccess: async function () {
          const res = await api.get("/api/users/me", {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          });

          if (res.data.status === "Active") {
            Cookies.set("status", "Active");
            navigate("/dashboard");
          }
        },
        onPending: function () {
          console.log("Payment pending");
        },
        onError: function () {
          console.log("Payment error");
        },
        onClose: function () {
          console.log("Popup closed without finishing the payment");
        },
      });
    }
  } catch (err) {
    console.error("Payment failed:", err);
  }
};


  return (
    <Box minH="100vh" color="white">
      <Box borderBottom="1px solid" borderColor="gray.600" py={4}>
        <Container maxW="6xl">
          <Flex justify="space-between" as={Link} to="/" align="center">
            <Img src="/src/assets/alflix.png" alt="Logo" w="180px" />
          </Flex>
        </Container>
      </Box>

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

                <VStack align="start" spacing={4} p={6} fontSize="sm">
                  <Box w="100%">
                    <Text fontWeight="medium">Harga bulanan</Text>
                    <Text>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(plan.price)}
                    </Text>
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
                    <Text fontWeight="medium">Deskripsi</Text>
                    <Text>{plan.description}</Text>
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
                  <Text>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(plan.price)}
                  </Text>
                </Box>
                <Divider bgColor={"gray.300"} />
                <Box w="100%">
                  <Text fontWeight="medium">Kualitas video dan suara</Text>
                  <Text>{plan.resolution}</Text>
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
              </VStack>
            ))}
        </Box>
      </Container>

      <Container maxW="6xl" textAlign="center" py={6}>
        <PrimaryButton size="lg" px={12} onClick={handleSubmit} py={6}>
          {loading ? <Spinner size="sm" /> : "Langganan"}
        </PrimaryButton>
      </Container>
    </Box>
  );
}
