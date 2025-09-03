import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAsync } from "../../store/auth/async";
import { PrimaryButton } from "../components/button";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<loginSchema> = async (data) => {
    try {
      console.log("Submit function called with data:", data);

      const res = await dispatch(loginAsync(data));

      console.log("Response:", res);

      if (loginAsync.fulfilled.match(res) && res.payload) {
        const role = res.payload.user.role;

        toast({
          title: "Login success",
          description: "Welcome back",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        reset();
        navigate(role === "ADMIN" ? "/admin" : "/dashboard");
      } else if (loginAsync.rejected.match(res)) {
        const errorMessage =
          typeof res.payload === "string"
            ? res.payload
            : "Terjadi kesalahan saat login";

        console.error("Login failed:", errorMessage);

        toast({
          title: "Login failed",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);

      toast({
        title: "Error",
        description: "Terjadi kesalahan tidak terduga",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

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
        h={"100%"}
        bg="blackAlpha.400"
      />

      <Flex
        position="relative"
        align="center"
        px={{ base: "10px", md: "80px", lg: "100px" }}
        py="30px"
        justify="space-between"
        gap={4}
        zIndex={2}
        as={Link}
        to="/"
      >
        <Image
          src="/src/assets/alflix.png"
          h={{ base: "18px", md: "20px", lg: "30px" }}
          alt="Logo"
        />
      </Flex>

      <Flex
        position={"relative"}
        align="center"
        h={"100vh"}
        zIndex={2}
        direction={"column"}
        px={8}
      >
        <Box
          bg="blackAlpha.700"
          p={10}
          borderRadius={8}
          w={{ base: "100%", md: "460px" }}
        >
          <Text
            fontSize={{ base: "24px", md: "30px", lg: "30px" }}
            fontWeight="semibold"
            color="white"
            mb={4}
          >
            Masuk
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email} mb={4}>
              <Input
                placeholder="Email"
                {...register("email")}
                type="email"
                size="md"
                border="1px solid #D2D2D2"
                borderRadius="3px"
                color="white"
                bg="blackAlpha.500"
                py={7}
                _placeholder={{ color: "#B1B1B1", fontSize: "18px" }}
              />
              <FormErrorMessage fontSize="sm" color="red.500">
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password} mb={4}>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
                size="md"
                border="1px solid #D2D2D2"
                borderRadius="3px"
                color="white"
                bg="blackAlpha.500"
                py={7}
                _placeholder={{ color: "#B1B1B1", fontSize: "18px" }}
              />
              <FormErrorMessage fontSize="sm" color="red.500">
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <PrimaryButton w="100%" type="submit">
              {loading ? <Spinner /> : "Masuk"}
            </PrimaryButton>
          </form>

          <Link to="/forgot-password">
            <Text mt={4} textAlign={"center"} textDecor={"underline"}>
              Lupa Password?
            </Text>
          </Link>
          <Flex mt={8} justifyContent="center" align="center">
            <Text>Baru di Alflix?</Text>
            <Link to="/register">
              <Text textDecor="underline" ml={2}>
                Daftar Sekarang
              </Text>
            </Link>
          </Flex>
        </Box>
      </Flex>

      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        h="120px"
        bgGradient="linear(to-t, #000000ff 0%, transparent 80%)"
        clipPath="ellipse(75% 100% at 50% 100%)"
      />
    </Box>
  );
}
