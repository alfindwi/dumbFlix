import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FaFileImage } from "react-icons/fa";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { getCategories } from "../../../store/category/async";
import { createSeries } from "../../../store/series/async";
import Select from "react-select";

export function AddSeries() {
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

  const [seriesName, setSeriesName] = useState("");
  const [seriesYear, setSeriesYear] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPosters] = useState<File | null>(null);
  const [trailer, setTrailer] = useState("");

  const { category } = useAppSelector((state) => state.category);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);

  const options = category.map((cat) => ({
    value: cat.id,
    label: cat.categoryName,
  }));

  const handleChange = (selected: any) => {
    setCategoryIds(selected.map((item: any) => item.value));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPosters(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("seriesName", seriesName);
    formData.append("description", description);
    formData.append("seriesYear", seriesYear);
    formData.append("trailer", trailer);
    if (poster) formData.append("poster", poster);

    categoryIds.forEach((id: number) => {
      formData.append("categoryIds", id.toString());
    });

    try {
      await dispatch(createSeries(formData)).unwrap();
      toast({
        title: "Movie created successfully!",
        description: "your movie processed in background",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSeriesName("");
      setSeriesYear("");
      setDescription("");
      setPosters(null);
      setTrailer("");
      setCategoryIds([]);
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
        Add Series
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex flexWrap="wrap" gap={2}>
          <Input
            type="text"
            placeholder="Title"
            bgColor={"#343434"}
            border={"2px solid #D2D2D2"}
            _placeholder={{ color: "#B1B1B1" }}
            flex={1}
            value={seriesName}
            onChange={(e) => setSeriesName(e.target.value)}
          />
          <InputGroup w={{ base: "100%", md: "180px" }}>
            <Input
              type="file"
              opacity="0"
              position="absolute"
              zIndex="2"
              cursor="pointer"
              w="full"
              onChange={handlePosterChange}
              h="full"
            />
            <Button
              w="full"
              bgColor={"#343434"}
              border={"2px solid #D2D2D2"}
              _hover={{ bgColor: "#444444" }}
              color="#b9b9b9"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontSize={"15px"}
            >
              Attach Poster
              <Icon as={FaFileImage} fontSize={"25px"} color={"#E50914"} />
            </Button>
          </InputGroup>
        </Flex>
        <Input
          type="number"
          placeholder="Year"
          value={seriesYear}
          onChange={(e) => setSeriesYear(e.target.value)}
          mt={4}
          bgColor={"#343434"}
          w="full"
          border={"2px solid #D2D2D2"}
          _placeholder={{ color: "#B1B1B1" }}
          mb={4}
        />
        <Select
          options={options}
          onChange={handleChange}
          placeholder="Select Category"
          value={options.filter((option) => categoryIds.includes(option.value))}
          isMulti
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#343434",
              border: "2px solid #D2D2D2",
              color: "white",
              padding: "2px 4px",
              borderRadius: "4px",
              boxShadow: "none",
              minHeight: "40px",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#B1B1B1",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: "#555555",
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: "white",
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: "white",
              ":hover": {
                backgroundColor: "#777777",
                color: "white",
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#343434",
              color: "white",
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? "#555555" : "#343434",
              color: "white",
              ":active": {
                backgroundColor: "#777777",
              },
            }),
          }}
        />
        <Textarea
          mt={4}
          bgColor={"#343434"}
          w="full"
          border={"2px solid #D2D2D2"}
          placeholder="Description"
          h={"150px"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          _placeholder={{ color: "#B1B1B1" }}
          resize={"none"}
        />
        <Flex justifyContent={"flex-end"}>
          <Button
            mt={4}
            bgColor={"#E50914"}
            type="submit"
            _hover={{ bgColor: "#E50914" }}
            w={{ base: "100%", md: "200px" }}
          >
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
