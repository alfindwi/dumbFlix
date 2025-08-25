import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box
} from "@chakra-ui/react";

interface FaqAccordionProps {
  question: string;
  answer: string;
}

export const FaqAccordion = ({ question, answer }: FaqAccordionProps) => {
  return (
    <AccordionItem mb={2}>
      <h1>
        <AccordionButton
          bg="#2d2d2d"
          color="white"
          p={6}
          fontSize={"25px"}
          _hover={{ bg: "#5b5b5bff" }}
          _expanded={{ bg: "#2d2d2d" }}
        >
          <Box flex="1" textAlign="left" >
            {question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel mt={"3px"} p={6} fontSize={"25px"} bg="#2d2d2d" color="white">
        {answer}
      </AccordionPanel>
    </AccordionItem>
  );
};
