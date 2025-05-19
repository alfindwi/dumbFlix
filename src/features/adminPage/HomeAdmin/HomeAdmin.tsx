import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";

export function HomeAdmin() {
  return (
    <>
      <NavbarAdmin />
      <HomeContent />
    </>
  );
}

function HomeContent() {
  return (
    <Box h={"100vh"} p={9}>
      <Text fontSize={"30px"} mb={8} fontWeight={"bold"}>
        Income Transaction
      </Text>
      <TableContainer>
        <Table size="sm">
          <Thead bg={"#1F1F1F"}>
            <Tr>
              <Th color={"#E50914"}>No</Th>
              <Th color={"#E50914"}>Users</Th>
              <Th color={"#E50914"}>Proof of transfer</Th>
              <Th color={"#E50914"}>Remaining Active</Th>
              <Th color={"#E50914"}>Status User</Th>
              <Th color={"#E50914"}>Status Payment</Th>
              <Th color={"#E50914"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody bg={"#2B2B2B"}>
            <Tr>
              <Td>1</Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                apindwi
              </Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                bca.jpg
              </Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                26/hari
              </Td>
              <Td color={"#0ACF83"}> Active</Td>
              <Td color={"#0ACF83"}> Approve</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<IoMdArrowDropdown />}
                    colorScheme="none"
                    color={"#1C9CD2"}
                    bgColor={"none"}
                    fontSize="50px"
                  />
                  <MenuList bgColor={"#1F1F1F"}>
                    <MenuItem
                      color={"#0ACF83"}
                      bgColor={"#1F1F1F"}
                      fontWeight={"semibold"}
                      onClick={() => console.log("Edit clicked")}
                    >
                      Approved
                    </MenuItem>
                    <MenuItem
                      color={"#FF0000"}
                      bgColor={"#1F1F1F"}
                      fontWeight={"semibold"}
                      onClick={() => console.log("Delete clicked")}
                    >
                      Cancel
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tbody>
          <Tbody bg={"#2B2B2B"}>
            <Tr>
              <Td>2</Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                rendi
              </Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                mandiri.jpg
              </Td>
              <Td
                maxW="150px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                365/hari
              </Td>
              <Td color={"#FF0742"}> Not Active</Td>
              <Td color={"#F7941E"}> Pending</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<IoMdArrowDropdown />}
                    colorScheme="none"
                    color={"#1C9CD2"}
                    bgColor={"none"}
                    fontSize="50px"
                  />
                  <MenuList bgColor={"#1F1F1F"}>
                    <MenuItem
                      color={"#0ACF83"}
                      bgColor={"#1F1F1F"}
                      fontWeight={"semibold"}
                      onClick={() => console.log("Edit clicked")}
                    >
                      Approved
                    </MenuItem>
                    <MenuItem
                      color={"#FF0000"}
                      bgColor={"#1F1F1F"}
                      fontWeight={"semibold"}
                      onClick={() => console.log("Delete clicked")}
                    >
                      Cancel
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
