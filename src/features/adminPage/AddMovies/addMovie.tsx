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
import React, { useEffect, useState } from "react";
import { IoAttachSharp } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getCategories } from "../../../store/category/async";
import { createMovie } from "../../../store/movie/async";
import { NavbarAdmin } from "../../navbarAdmin/navbarAdmin";
import { FaFileImage } from "react-icons/fa6";

export function AddMovies() {
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [trailer, setTrailer] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [poster, setPosters] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPosters(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("year", year);
    formData.append("trailer", trailer);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (video) formData.append("video", video);
    if (poster) formData.append("poster", poster);

    categoryIds.forEach((id: number) => {
      formData.append("categoryIds", id.toString());
    });

    try {
      await dispatch(createMovie(formData)).unwrap();
      toast({
        title: "Movie created successfully!",
        description: "your movie processed in background",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTitle("");
      setDescription("");
      setYear("");
      setTrailer("");
      setThumbnail(null);
      setVideo(null);
      setCategoryIds([]);
    } catch (error) {
      toast({
        title: "Failed to create movie.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex p={6} mt={"20px"} mx={"auto"} maxW={"95%"} direction={"column"}>
      <Text fontSize={"20px"} fontWeight={"bold"} mb={4}>
        Add Film
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex flexWrap="wrap" gap={2}>
          <Input
            type="text"
            placeholder="Title"
            bgColor={"#343434"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            border={"2px solid #D2D2D2"}
            _placeholder={{ color: "#B1B1B1" }}
            flex={1}
          />
          <InputGroup w={{ base: "100%", md: "180px" }}>
            <Input
              type="file"
              opacity="0"
              position="absolute"
              zIndex="2"
              cursor="pointer"
              w="full"
              h="full"
              onChange={handlePosterChange}
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
              Upload Poster
              <Icon as={FaFileImage} fontSize={"20px"} color={"#E50914"} />
            </Button>
          </InputGroup>
        </Flex>
        <Input
          type="number"
          placeholder="Year"
          mt={4}
          bgColor={"#343434"}
          w="full"
          border={"2px solid #D2D2D2"}
          _placeholder={{ color: "#B1B1B1" }}
          mb={4}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Trailer"
          bgColor={"#343434"}
          w="full"
          border={"2px solid #D2D2D2"}
          _placeholder={{ color: "#B1B1B1" }}
          mb={4}
          value={trailer}
          onChange={(e) => setTrailer(e.target.value)}
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
        <Flex gap={2}>
          <InputGroup w={{ base: "100%", md: "100%" }} mt={4}>
            <Input
              type="file"
              opacity="0"
              position="absolute"
              zIndex="2"
              cursor="pointer"
              w="full"
              h="full"
              onChange={handleThumbnailChange}
            />
            <Button
              w="full"
              bgColor="#343434"
              border="2px solid #D2D2D2"
              _hover={{ bgColor: "#444444" }}
              color="#b9b9b9"
              fontSize="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Text fontWeight={"medium"}>Upload Thumbnail</Text>
              <Icon as={IoAttachSharp} fontSize="20px" color="#E50914" />
            </Button>
          </InputGroup>
          <InputGroup w={{ base: "100%", md: "100%" }} mt={4}>
            <Input
              type="file"
              opacity="0"
              position="absolute"
              zIndex="2"
              cursor="pointer"
              w="full"
              h="full"
              onChange={handleVideoChange}
            />
            <Button
              w="full"
              bgColor="#343434"
              border="2px solid #D2D2D2"
              _hover={{ bgColor: "#444444" }}
              color="#b9b9b9"
              fontSize="15px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Text fontWeight={"medium"}>Upload Video</Text>
              <Icon as={MdFileUpload} fontSize="20px" color="#E50914" />
            </Button>
          </InputGroup>
        </Flex>

        <Flex justifyContent={"flex-end"}>
          <Button
            mt={4}
            type="submit"
            bgColor={"#E50914"}
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
