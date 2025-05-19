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
  Select,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
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
        color={"white"}
        fontWeight={"bold"}
        onClick={onOpenRegister}
      >
        Register
      </Button>

      {/* Modal Register */}
      <Modal isOpen={isOpenRegister} onClose={onCloseRegister}>
        <ModalOverlay />
        <ModalContent bgColor={"#1f1f1f"}>
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

                <FormControl isInvalid={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    mt={2}
                    bgColor={"#343434"}
                    w="full"
                    _hover={{ bgColor: "#444444" }}
                    _placeholder={{ color: "#B1B1B1" }}
                    icon={<IoMdArrowDropdown />}
                    color={"#b9b9b9"}
                    {...register("gender")}
                  >
                    <option
                      value="male"
                      style={{ color: "#b9b9b9", backgroundColor: "#343434" }}
                    >
                      Male
                    </option>
                    <option
                      value="female"
                      style={{ color: "#b9b9b9", backgroundColor: "#343434" }}
                    >
                      Female
                    </option>
                  </Select>
                  <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your phone number"
                    {...register("phone")}
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.address}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    {...register("address")}
                  />
                  <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
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
