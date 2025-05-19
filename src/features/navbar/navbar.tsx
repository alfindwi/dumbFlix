import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaMoneyBill, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaMoneyBill1, FaRegUser, FaTv } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit, ImHome } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/auth/slice";
import { ButtonLogin } from "./buttonLogin";
import { ButtonRegister } from "./buttonRegister";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    dispatch(logout());
    toast({
      title: "Logout Berhasil",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Flex
      as="nav"
      bg="#1F1F1F"
      p={4}
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.6)"
      zIndex={10}
      backdropFilter="blur(10px)"
    >
      {isMobile ? (
        <IconButton
          icon={<GiHamburgerMenu />}
          aria-label="Open Menu"
          variant="ghost"
          color="white"
          fontSize="24px"
          onClick={onOpen}
        />
      ) : (
        <Flex alignItems="center" fontWeight="bold" gap={7} ml={8}>
          <Text as={Link} to="/" cursor="pointer" color="white">
            Home
          </Text>
          <Text as={Link} to="/tvshow" cursor="pointer" color="white">
            TV Shows
          </Text>
          <Text as={Link} to="/movies" cursor="pointer" color="white">
            Movies
          </Text>
        </Flex>
      )}

      <Flex
        justify="center"
        position={{ base: "absolute", md: "relative" }}
        left={{ base: "50%", md: "auto" }}
        transform={{ base: "translateX(-50%)", md: "none" }}
        as={Link}
        to="/"
      >
        <Img
          src="/src/assets/ALFLIX.png"
          alt="Logo"
          mr={{ base: 0, md: isLoggedIn ? "10rem" : "4rem" }}
          h={{ base: "20px", md: "25px" }}
        />
      </Flex>

      {/* Menu Profil */}
      {!isMobile && (
        <Flex gap={2} mr={9} alignItems="center" zIndex={10}>
          {!isLoggedIn ? (
            <>
              <ButtonLogin />
              <ButtonRegister />
            </>
          ) : (
            <Menu>
              <MenuButton as={Box} cursor="pointer">
                <Avatar
                  src={
                    user?.image ||
                    "https://i.pinimg.com/736x/4e/d1/c8/4ed1c8ae3c42f348db7eedb18abe2300.jpg"
                  }
                />
              </MenuButton>
              <MenuList bgColor="black" zIndex="1000">
                <MenuItem
                  as={Link}
                  bgColor={"black"}
                  to="/profile"
                  _hover={{ color: "#E50914" }}
                >
                  <FaRegUser
                    style={{ marginRight: "10px", color: "#E50914" }}
                  />
                  Profile
                </MenuItem>
                <MenuItem
                  as={Link}
                  to="/payment"
                  bgColor={"black"}
                  _hover={{ color: "#E50914" }}
                >
                  <FaMoneyBill1
                    style={{ marginRight: "10px", color: "#E50914" }}
                  />
                  Pay
                </MenuItem>
                <Divider borderColor="gray.600" />
                <MenuItem
                  onClick={handleLogout}
                  _hover={{ color: "red" }}
                  bgColor={"black"}
                >
                  <ImExit style={{ marginRight: "10px", color: "red" }} />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      )}

      {/* Drawer untuk Hamburger Menu di Layar Kecil */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#1F1F1F" color="white">
          <DrawerCloseButton />
          <DrawerHeader color={"#E50914"} fontWeight={"bold"}>
            <Img
              src="/src/assets/ALFLIX.png"
              alt="Logo"
              mr={{ base: 0, md: 20 }}
              w="170px"
              h="25px"
            />
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4} fontWeight={"bold"}>
              <Flex align="center" gap={2}>
                <ImHome />
                <Text as={Link} to="/" onClick={onClose} cursor="pointer">
                  Home
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <FaTv />
                <Text as={Link} to="/tvshow" onClick={onClose} cursor="pointer">
                  TV Shows
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <BiSolidCameraMovie />
                <Text as={Link} to="/movies" onClick={onClose} cursor="pointer">
                  Movies
                </Text>
              </Flex>

              <Divider borderColor="gray.600" />

              <Flex align="center" gap={2}>
                <FaUser />
                <Text
                  as={Link}
                  to="/profile"
                  onClick={onClose}
                  cursor="pointer"
                >
                  Profile
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <FaMoneyBill />
                <Text
                  as={Link}
                  to="/payment"
                  onClick={onClose}
                  cursor="pointer"
                >
                  Pay
                </Text>
              </Flex>
              <Flex
                align="center"
                gap={2}
                cursor="pointer"
                onClick={() => alert("Logout")}
              >
                <FaSignOutAlt />
                <Text>Logout</Text>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
