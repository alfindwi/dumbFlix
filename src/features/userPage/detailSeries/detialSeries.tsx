import { Box, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../../store";
import { DescTrailer } from "./descriptionTrailer";
import { Season } from "./season";

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
      {seriesDetail && <Season seasons={seriesDetail.seasons} seriesSlug={seriesDetail.seriesSlug} />}
    </Box>
  );
}
