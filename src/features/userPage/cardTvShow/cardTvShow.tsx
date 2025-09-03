import {
  Box,
  Icon,
  Img,
  Text,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../Paggination";
import { ISeries } from "../../../types/series";

interface SeriesListProps {
  series: ISeries[];
}

export const CardTvShow: React.FC<SeriesListProps> = ({ series }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const seriesPerPage = useBreakpointValue({
    base: 20,
    md: 21, 
  });

  const totalPages = useMemo(() => {
    return seriesPerPage ? Math.ceil(series.length / seriesPerPage) : 1;
  }, [series.length, seriesPerPage]);

  const paginatedSeries = useMemo(() => {
    if (!seriesPerPage) return [];
    const startIndex = (currentPage - 1) * seriesPerPage;
    const endIndex = Math.min(startIndex + seriesPerPage, series.length);
    return series.slice(startIndex, endIndex);
  }, [series, currentPage, seriesPerPage]);

  return (
    <Box p={6}>
      <Text fontSize="24px" fontWeight="semibold">
        Series
      </Text>

      <Wrap spacing={4} mt={4} justify={{ base: "center", md: "flex-start"}} w="full">
        {paginatedSeries.map((series) => (
          <WrapItem key={series.id}>
            <Box
              mt={4}
              bgColor="black"
              borderRadius="md"
              w="160px"
              transition="transform 0.5s ease, box-shadow 0.2s ease"
              as={Link}
              to={`/series/${series.seriesSlug}`}
              display="block"
              overflow="hidden"
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
                  h="100%"
                  objectFit="cover"
                  transition="transform 0.3s ease, filter 0.3s ease"
                  borderTopRadius="md"
                  className="image"
                  loading="lazy"
                  alt={series.seriesName}
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
