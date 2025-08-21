import { Button, ButtonProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface PrimaryButtonProps extends ButtonProps {
  to?: string;
  size?: string;
  
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Button
        as={RouterLink}
        to={to}
        size="sm"
        px={4}
        py={4}
        fontSize="15px"
        bgColor="#e50914"
        _hover={{ bgColor: "#c40b14ff" }}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      p={5}
      fontSize="15px"
      bgColor="#e50914"
      _hover={{ bgColor: "#e50914" }}
      {...props}
    >
      {children}
    </Button>
  );
};
