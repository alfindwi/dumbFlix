import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../../navbar/navbar";
import { Footer } from "../footer/footer";
import { DescTrailer } from "./descriptionTrailer";
import { Season } from "./season";
import { useAppSelector } from "../../../store";

export function DetailSeries() {
  return (
    <Box>
      <Navbar />
      <DetailSeriesContent />
      <Footer />
    </Box>
  );
}

export function DetailSeriesContent() {
  const { selectedSeries: series } = useAppSelector((state) => state.series);
  const seriesDetail = Array.isArray(series) ? series[0] : series;

  return (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="auto"
        width="100vw"
        position="relative"
        backgroundColor="black"
      ></Flex>
      <DescTrailer />
      {seriesDetail && <Season seasons={seriesDetail.seasons} seriesName={seriesDetail.seriesName} />}
    </Box>
  );
}
