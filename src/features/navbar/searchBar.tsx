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
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search/${searchValue.trim()}`);
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setHasSearched(false);
    navigate("/");
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setHasSearched(false);
    }
  }, [searchValue]);

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
              ref={searchRef}
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
                <InputRightElement
                  onClick={hasSearched ? handleClearSearch : handleSearch}
                  cursor="pointer"
                >
                  <motion.div
                    animate={{ rotate: hasSearched ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {hasSearched ? (
                      <IoClose color="gray.400" size={20} />
                    ) : (
                      <FaSearch color="gray.400" />
                    )}
                  </motion.div>
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
          <InputRightElement
            onClick={hasSearched ? handleClearSearch : handleSearch}
            cursor="pointer"
          >
            <motion.div
              animate={{ rotate: hasSearched ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {hasSearched ? (
                <IoClose color="gray.400" size={20} />
              ) : (
                <FaSearch color="gray.400" />
              )}
            </motion.div>
          </InputRightElement>
        </InputGroup>
      )}
    </Box>
  );
}
