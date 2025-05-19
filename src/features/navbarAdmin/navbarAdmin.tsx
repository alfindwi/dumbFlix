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
import { BiCategory, BiSolidCameraMovie } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { FaTv } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLocalMovies, MdOutlineLiveTv } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/auth/slice";

export function NavbarAdmin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
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
        <Flex gap={6} align="center" color="white">
          <Text
            as={Link}
            to="/admin/series"
            fontWeight={"bold"}
            _hover={{ color: "#E50914" }}
          >
            Series
          </Text>
          <Text
            as={Link}
            to="/admin/movies"
            fontWeight={"bold"}
            _hover={{ color: "#E50914" }}
          >
            Movie
          </Text>
        </Flex>
      )}

      <Flex
        justify="center"
        position={{ base: "absolute", md: "relative" }}
        left={{ base: "50%", md: "auto" }}
        transform={{ base: "translateX(-50%)", md: "none" }}
        as={Link}
        to="/admin"
      >
        <Img
          src="/src/assets/ALFLIX.png"
          alt="Logo"
          mr={"2rem"}
          h={{ base: "20px", md: "25px" }}
        />
      </Flex>

      {!isMobile && (
        <Menu>
          <MenuButton as={Box} cursor="pointer">
            <Avatar src="https://i.pinimg.com/736x/e5/6f/8c/e56f8cd5092680159687608983043942.jpg" />
          </MenuButton>
          <MenuList bgColor="black" zIndex="1000">
            <MenuItem
              as={Link}
              to="/admin/addmovie"
              _hover={{ color: "#E50914" }}
              bgColor={"black"}
            >
              <BiSolidCameraMovie
                style={{ marginRight: "10px", color: "#E50914" }}
              />
              Add Movie
            </MenuItem>
            <MenuItem
              as={Link}
              to="/admin/addseries"
              _hover={{ color: "#E50914" }}
              bgColor={"black"}
            >
              <FaTv style={{ marginRight: "10px", color: "#E50914" }} />
              Add Series
            </MenuItem>
            <MenuItem
              as={Link}
              to="/admin/addcategory"
              _hover={{ color: "#E50914" }}
              bgColor={"black"}
            >
              <BiCategory style={{ marginRight: "10px", color: "#E50914" }} />
              Add Category
            </MenuItem>
            <Divider borderColor="gray.600" />
            <MenuItem
              onClick={handleLogout}
              _hover={{ color: "red" }}
              bgColor={"black"}
            >
              <FaSignOutAlt style={{ marginRight: "10px", color: "red" }} />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#1F1F1F" color="white">
          <DrawerCloseButton />
          <DrawerHeader
            color={"#E50914"}
            as={Link}
            to={"/admin"}
            fontWeight={"bold"}
          >
            DumbFlix
          </DrawerHeader>
          <DrawerBody>
            <Flex direction="column" gap={4} fontWeight={"bold"}>
              <Flex align="center" gap={2}>
                <MdLocalMovies />
                <Text
                  as={Link}
                  to="/admin/movies"
                  onClick={onClose}
                  cursor="pointer"
                >
                  List Movie
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <BiSolidCameraMovie />
                <Text
                  as={Link}
                  to="/admin/addmovie"
                  onClick={onClose}
                  cursor="pointer"
                >
                  Add Movie
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <MdOutlineLiveTv />
                <Text
                  as={Link}
                  to="/admin/series"
                  onClick={onClose}
                  cursor="pointer"
                >
                  List Series
                </Text>
              </Flex>
              <Flex align="center" gap={2}>
                <FaTv />
                <Text
                  as={Link}
                  to="/admin/addseries"
                  onClick={onClose}
                  cursor="pointer"
                >
                  Add Series
                </Text>
              </Flex>
              <Divider borderColor="gray.600" />
              <Flex
                align="center"
                gap={2}
                cursor="pointer"
                onClick={handleLogout}
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
