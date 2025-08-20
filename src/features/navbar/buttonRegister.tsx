import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store";
import { registerAsync } from "../../store/auth/async";
import {
  registerSchema,
  RegisterSchema,
} from "../../validations/registerSchema";

export function ButtonRegister() {
  const dispatch = useAppDispatch();
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

  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    console.log("Submit function called with data:", data);
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
      onCloseRegister();
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

  return (
    <>
      <Button
        size={"md"}
        bgColor={"#E50914"}
        _hover={{ bgColor: "#E50914" }}
        display={{ base: "none", md: "block" }}
        color={"white"}
        fontWeight={"bold"}
        onClick={onOpenRegister}
      >
        Register
      </Button>

      <Text
        cursor="pointer"
        display={{ base: "block", md: "none" }}
        onClick={onOpenRegister}
        fontWeight={"bold"}
      >
        Register
      </Text>

      <Modal isOpen={isOpenRegister} onClose={onCloseRegister}>
        <ModalOverlay />
        <ModalContent
          bgColor={"#1f1f1f"}
          maxW={{ base: "90vw", sm: "400px", md: "500px" }}>
          <ModalHeader fontWeight={"bold"} color={"#E50914"}>
            Register
          </ModalHeader>
          <ModalCloseButton _hover={{ color: "#E50914" }} />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.fullName}>
                  <FormLabel>Fullname</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your fullname"
                    {...register("fullName")}
                  />
                  <FormErrorMessage>
                    {errors.fullName?.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  bgColor={"#E50914"}
                  _hover={{ bgColor: "#E50914" }}
                  fontWeight={"bold"}
                  w="full"
                  mt={2}
                  type="submit"
                  isLoading={loading}
                  mb={4}
                >
                  {loading ? <Spinner size="md" color="white" /> : "Submit"}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
