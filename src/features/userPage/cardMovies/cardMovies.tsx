import { Box, Icon, Img, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useState, useMemo, useRef, useEffect } from "react";
import { MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../Paggination";
import { IMovie } from "../../../types/movie";

export interface MoviesListProps {
  movies: IMovie[];
}

export const moviesPerPage = 28;

export const CardMovies: React.FC<MoviesListProps> = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = Math.min(startIndex + moviesPerPage, movies.length);
    return movies.slice(startIndex, endIndex);
  }, [movies, currentPage]);


  console.log(
    `Current Page: ${currentPage}, Movies on page: ${paginatedMovies.length}`
  );

  return (
    <Box p={6}>
      <Text fontSize="24px" fontWeight="semibold">
        Movies
      </Text>

      <Wrap spacing={4} mt={4} justify="flex-start" w="full">
        {paginatedMovies.map((movie) => (
          <WrapItem key={movie.id}>
            <Box
              mt={4}
              bgColor="black"
              borderRadius="md"
              w="160px"
              transition="transform 0.5s ease, box-shadow 0.2s ease"
              as={Link}
              to={`/movie/${movie.title}`}
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
                  src={movie.poster}
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
                {movie.title}
              </Text>
              <Text fontSize="12px" mt={1} fontWeight="medium" color="#929292">
                {movie.year}
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
