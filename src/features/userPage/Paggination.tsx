import { Button, Flex } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;
  return (
    <Flex mt={8} justify="center" align="center" gap={2}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        bgColor={"#E50914"}
        _hover={{ bgColor: "#E50914" }}
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            colorScheme={currentPage === page ? "#3C3D37" : "gray"}
            color={currentPage === page ? "#E50914" : ""}
            fontWeight={"bold"}
          >
            {page}
          </Button>
        )
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        bgColor={"#E50914"}
        _hover={"#E50914"}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
