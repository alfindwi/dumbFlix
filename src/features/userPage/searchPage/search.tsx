import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { searchAll } from "../../../store/search/async";
import Pagination from "../Paggination";

export function Search() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { search: searchResult, loading: isLoading } = useAppSelector(
    (state) => state.search
  );
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = searchResult.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (keyword) {
      dispatch(searchAll(keyword));
      setCurrentPage(1);
    }
  }, [keyword]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNavigate = (item: any) => {
    if (item.type === "movie") {
      navigate(`/movies/${item.slug}`);
    } else {
      navigate(`/series/${item.slug}`);
    }
  };

  return (
    <Box
      px={{ base: "15px", md: "100px" }}
      py={{ base: "30px", md: 20 }}
      color="white"
    >
      {isLoading ? (
        <VStack spacing={6} align="stretch">
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index}>
              <Flex
                direction="row"
                gap={{ base: 3, md: 6 }}
                pb={2}
                align="flex-start"
              >
                <Skeleton
                  w={{ base: "90px", md: "120px" }}
                  h={{ base: "130px", md: "150px" }}
                  borderRadius="3px"
                />
                <Box maxW="100%">
                  <Skeleton height="20px" mb={2} w="120px" />
                  <Skeleton height="16px" mb={2} w="200px" />
                  <SkeletonText
                    noOfLines={2}
                    spacing="2"
                    skeletonHeight="3"
                    w="90%"
                  />
                </Box>
              </Flex>
              {index !== 4 && <Divider borderColor="gray.600" mt={4} />}
            </Box>
          ))}
        </VStack>
      ) : searchResult.length === 0 ? (
        <Box textAlign="center" mt={10}>
          <Text fontSize="xl" color="gray.400">
            Tidak ada movie atau series dengan keyword <b>"{keyword}"</b>
          </Text>
        </Box>
      ) : (
        <>
          <VStack spacing={6} align="stretch">
            {currentItems.map((item, index) => (
              <Box key={item.slug}>
                <Flex
                  direction="row"
                  gap={{ base: 3, md: 6 }}
                  onClick={() => handleNavigate(item)}
                  pb={2}
                  align="flex-start"
                >
                  <Image
                    src={item.poster}
                    objectFit="cover"
                    w={{ base: "90px", md: "120px" }}
                    h={{ base: "130px", md: "150px" }}
                    alt={item.title}
                    userSelect="none"
                    borderRadius="3px"
                    _hover={{ cursor: "pointer", filter: "brightness(50%)" }}
                    transition="all 0.2s ease-in-out"
                    flexShrink={0}
                  />
                  <Box maxW="100%">
                    <Tag
                      size="sm"
                      mb={1}
                      bgColor={item.type === "movie" ? "#cb0404" : "#123524"}
                      color="white"
                    >
                      {item.type}
                    </Tag>
                    <Heading
                      size="sm"
                      fontWeight="semibold"
                      mb={1}
                      noOfLines={2}
                    >
                      {item.title}
                    </Heading>
                    {item.description && (
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        noOfLines={2}
                        maxW={{ base: "220px", md: "900px" }}
                      >
                        {item.description}
                      </Text>
                    )}
                  </Box>
                </Flex>
                {index !== currentItems.length - 1 && (
                  <Divider borderColor="gray.600" mt={4} />
                )}
              </Box>
            ))}
          </VStack>

          {searchResult.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </Box>
  );
}
