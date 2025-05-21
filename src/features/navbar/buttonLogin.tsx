import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "../../validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAsync } from "../../store/auth/async";

export function ButtonLogin() {
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
        navigate(role === "ADMIN" ? "/admin" : "/");
      } else if (loginAsync.rejected.match(res)) {
        const errorMessage =
          typeof res.payload === "string" ? res.payload : "Terjadi kesalahan saat login";
  
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
  

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  return (
    <>
      <Button
        size={"md"}
        bgColor={"#E50914"}
        _hover={{ bgColor: "#E50914" }}
        color={"white"}
        fontWeight={"bold"}
        onClick={onOpenLogin}
      >
        Login
      </Button>

      {/* modal login */}
      <Modal isOpen={isOpenLogin} onClose={onCloseLogin}>
        <ModalOverlay />
        <ModalContent bgColor={"#1f1f1f"}>
          <ModalHeader fontWeight={"bold"} color={"#E50914"}>
            Login
          </ModalHeader>
          <ModalCloseButton _hover={{ color: "#E50914" }} />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}
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
                  {loading ? <Spinner /> : "Login"}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
