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
import { TiPencil } from "react-icons/ti";
import Cookies from "js-cookie";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImExit, ImHome } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/auth/slice";
import { SearchBar } from "./searchBar";

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("role");
    dispatch(logout());
    toast({
      title: "Logout Berhasil",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      w="100%"
      px={6}
      py={4}
      align="center"
      justify="space-between"
      position="absolute"
      top={0}
      left={0}
      zIndex={10}
      bg="transparent"
      color="white"
    >
      {isMobile ? (
        <>
          <IconButton
            icon={<GiHamburgerMenu />}
            aria-label="Open Menu"
            variant="ghost"
            color="white"
            fontSize="24px"
            onClick={onOpen}
          />
          <SearchBar />
        </>
      ) : (
        <Flex alignItems="center" fontWeight="bold" gap={7} ml={8}>
          <Text as={Link} to="/dashboard" cursor="pointer" color="white">
            Home
          </Text>
          <Text as={Link} to="/tvSeries" cursor="pointer" color="white">
            TV Series
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
      ></Flex>

      {!isMobile && (
        <Flex gap={2} mr={9} alignItems="center" zIndex={10}>
          <Menu>
            <SearchBar />
            <MenuButton as={Box} cursor="pointer">
              <Avatar
                src="https://i.pinimg.com/736x/4e/d1/c8/4ed1c8ae3c42f348db7eedb18abe2300.jpg"
                borderRadius="md"
                boxSize="40px"
              />
            </MenuButton>
            <MenuList bgColor="blackAlpha.600" zIndex="1000">
              <MenuItem as={Link} to="/profile" bgColor={"blackAlpha.600"}>
                <TiPencil style={{ marginRight: "10px" }} size={20} />
                Manage Profile
              </MenuItem>
              <MenuItem as={Link} to="/account" bgColor={"blackAlpha.600"}>
                <FaRegUser style={{ marginRight: "10px" }} size={20} />
                Account
              </MenuItem>
              <MenuItem onClick={handleLogout} bgColor={"blackAlpha.600"}>
                <ImExit style={{ marginRight: "10px" }} />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}

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
                <Text
                  as={Link}
                  to="/dashboard"
                  onClick={onClose}
                  cursor="pointer"
                >
                  Home
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <FaTv />
                <Text
                  as={Link}
                  to="/tvSeries"
                  onClick={onClose}
                  cursor="pointer"
                >
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
                <FaSignOutAlt />
                <Text onClick={handleLogout} cursor="pointer">
                  Logout
                </Text>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
