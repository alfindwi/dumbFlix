import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { registerAsync } from "../../store/auth/async";
import {
  registerSchema,
  RegisterSchema,
} from "../../validations/registerSchema";

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {

    try {
      const res = await dispatch(registerAsync(data)).unwrap();
      console.log("Registrasi berhasil:", res);
      toast({
        title: "Registrasi berhasil",
        description: "Success register new account",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      reset();
      navigate("/login");
    } catch (error: any) {
      console.error("Registrasi gagal:", error);
      const errorMessage =
        error?.message === "User already exists"
          ? "Email sudah terdaftar, silakan gunakan email lain."
          : error?.message || "Terjadi kesalahan saat registrasi";
      toast({
        title: "Registrasi gagal",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Debug function untuk test button click
  const handleButtonClick = () => {
    console.log("Button clicked!");
    console.log("Loading state:", loading);
    console.log("Form errors:", errors);
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
        h="100%"
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
            Daftar
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.fullName}>
              <Input
                placeholder="Nama Lengkap"
                type="text"
                size="md"
                mb={4}
                {...register("fullName")}
                border="1px solid #D2D2D2"
                borderRadius="3px"
                color="white"
                bg="blackAlpha.500"
                required
                py={7}
                _placeholder={{ color: "#B1B1B1", fontSize: "18px" }}
              />
              <FormErrorMessage fontSize="sm" color="red.500">
                {errors.fullName && errors.fullName.message}
              </FormErrorMessage>
            </FormControl>

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

            <Button
              bgColor="#E50914"
              _hover={{ bgColor: "#b30c14ff" }}
              w="100%"
              type="submit"
              isLoading={loading}
              loadingText="Mendaftar..."
              onClick={handleButtonClick}
              py={7}
            >
              {loading ? <Spinner /> : "Daftar"}
            </Button>
          </form>

          <Flex mt={8} justifyContent="center" align="center">
            <Text>Sudah punya akun?</Text>
            <Link to="/login">
              <Text textDecor="underline" ml={2}>
                Masuk
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
