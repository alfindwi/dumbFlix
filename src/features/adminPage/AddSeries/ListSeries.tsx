import {
  Box,
  Button,
  Flex,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SeriesList } from "./SeriesList";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect } from "react";
import { getSeries } from "../../../store/series/async";

export function ListSeries() {
  return (
    <>
      <NavbarAdmin />
      <Content />
    </>
  );
}
export function Content() {
  const dispatch = useAppDispatch();

  const { series } = useAppSelector((state) => state.series);

  useEffect(() => {
    dispatch(getSeries());
  }, [dispatch]);
  return (
    <Box h={"100vh"} p={9}>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={8}>
        <Flex alignItems={"center"}>
          <Text fontSize={"30px"} mr={4} fontWeight={"bold"}>
            List Series
          </Text>
        </Flex>

        <Button
          bgColor={"#E50914"}
          _hover={{ bgColor: "#E50914" }}
          as={Link}
          to={"/admin/addseries"}
          fontSize={"13px"}
          size={"sm"}
          p={5}
          fontWeight={"bold"}
        >
          Add Series
        </Button>
      </Flex>
      <SeriesList  series={series}/>
      
    </Box>
  );
}
