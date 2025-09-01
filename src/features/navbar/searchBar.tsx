import {
  Box,
  IconButton,
  Input,
  InputGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query.trim()}`);
    }
  };

  const handleToggle = () => {
    if (isOpen) {
      setQuery("");
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box display="flex" alignItems="center" position="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isMobile ? 180 : 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <InputGroup>
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                bgColor="#343434"
                color="white"
                border="none"
                borderRadius="full"
                px={4}
                _focus={{ boxShadow: "none" }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </InputGroup>
          </motion.div>
        )}
      </AnimatePresence>

      <IconButton
        aria-label="Toggle search"
        icon={isOpen ? <IoClose size={20} /> : <FaSearch size={18} />}
        onClick={handleToggle}
        variant="ghost"
        color="white"
        _hover={{ backgroundColor: "transparent" }}
        ml={2}
      />
    </Box>
  );
}
