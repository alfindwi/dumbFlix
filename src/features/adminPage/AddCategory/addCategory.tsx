import { Button, Flex, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useState } from "react";
import { createCategory } from "../../../store/category/async";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";

export function AddCategory() {
  return (
    <>
      <NavbarAdmin />
      <Content />
    </>
  );
}

function Content() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [categoryName, setCategoryName] = useState("");
  const { loading } = useAppSelector((state) => state.category);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryName);

    try {
      const resultAction = await dispatch(createCategory({ categoryName }));
      if (createCategory.fulfilled.match(resultAction)) {
        toast({
          title: "Category added.",
          description: "Your category has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setCategoryName("");
      } else {
        throw new Error("Failed to add category");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex p={6} mt={"20px"} mx="auto" maxW={"95%"} direction={"column"}>
      <Text fontSize={"20px"} fontWeight={"bold"} mb={4}>
        Add Category
      </Text>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Category Name"
          mt={4}
          bgColor={"#343434"}
          w="full"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          border={"2px solid #D2D2D2"}
          _placeholder={{ color: "#B1B1B1" }}
        />

        <Flex justifyContent={"flex-end"}>
          <Button
            mt={4}
            type="submit"
            bgColor={"#E50914"}
            _hover={{ bgColor: "#E50914" }}
            w={{ base: "100%", md: "200px" }}
          >
            {loading ? <Spinner /> : "Add Category"}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
