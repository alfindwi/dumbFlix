import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useBreakpointValue,
  Slide,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const { isOpen, onToggle } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/search/${searchValue}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box position="relative">
      {isMobile ? (
        <>
          <IconButton
            icon={isOpen ? <IoClose color="white" size="25px" /> : <FaSearch />}
            onClick={onToggle}
            aria-label="Toggle Search"
            variant="ghost"
            color="white"
            zIndex={30}
          />
          <Slide direction="right" in={isOpen} style={{ zIndex: 20 }}>
            <Box
              position="fixed" 
              top="75px"
              right="0"
              w="58%"
              px={4}
            >
              <InputGroup size="md">
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search..."
                  bgColor="#343434"
                  color="white"
                  focusBorderColor="transparent"
                />
                <InputRightElement onClick={handleSearch} pointerEvents="none">
                  <FaSearch color="gray.400" />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Slide>
        </>
      ) : (
        <InputGroup w="250px" mr={4}>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            bgColor="#343434"
            onKeyPress={handleKeyPress}
            color="white"
            border="none"
            focusBorderColor="transparent"
          />
          <InputRightElement onClick={handleSearch} pointerEvents="none">
            <FaSearch color="gray.400" />
          </InputRightElement>
        </InputGroup>
      )}
    </Box>
  );
}
