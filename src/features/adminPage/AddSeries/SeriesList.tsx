import { Box, Icon, Img, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import { ISeries } from "../../../types/series";
import Pagination from "../../userPage/Paggination";

interface SeriesListProps {
  series: ISeries[];
}

const seriesPerPage = 30;

export const SeriesList: React.FC<SeriesListProps> = ({ series }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(series.length / seriesPerPage);

  const paginatedSeries = useMemo(() => {
    const startIndex = (currentPage - 1) * seriesPerPage;
    const endIndex = Math.min(startIndex + seriesPerPage, series.length);
    return series.slice(startIndex, endIndex);
  }, [series, currentPage]);

  return (
    <Box>
      <Wrap spacing={10} justify="flex-start" w="full">
        {paginatedSeries.map((series) => (
          <WrapItem key={series.id}>
            <Box
              mt={4}
              bgColor="black"
              borderRadius="md"
              w="160px"
              transition="transform 0.5s ease, box-shadow 0.2s ease"
              as={Link}
              to={`/admin/detail-series/${
                series.seriesName.replace(/ /g, "-") || ""
              }`}
              display="block"
            >
              <Box
                position="relative"
                w="100%"
                h="200px"
                overflow="hidden"
                _hover={{
                  ".image": {
                    transform: "scale(1.1)",
                    filter: "brightness(0.3)",
                  },
                  ".play-icon": { opacity: 1 },
                }}
              >
                <Img
                  src={series.poster}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                  transition="transform 0.3s ease, filter 0.3s ease"
                  borderTopRadius="md"
                  className="image"
                />
                <Box
                  className="play-icon"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  opacity={0}
                  cursor="pointer"
                  border={"5px solid white"}
                  borderRadius="full"
                  w="50px"
                  h="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={MdPlayArrow} color="white" boxSize={8} />
                </Box>
              </Box>
              <Text fontSize="15px" mt={2} fontWeight="semibold" isTruncated>
                {series.seriesName}
              </Text>
              <Text fontSize="12px" mt={1} fontWeight="medium" color="#929292">
                {series.seriesYear}
              </Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};
