import { Button, ButtonProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface PrimaryButtonProps extends ButtonProps {
  to?: string;
  size?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ to, children, ...props }) => {
  const baseStyle = {
    size: "md",
    px: 5,
    py: 5,
    fontSize: "15px",
    bgColor: "#e50914",
    color: "white",
    borderRadius: "lg",
    transition: "all 0.2s ease-in-out",
    _hover: {
      bgColor: "#c40b14",
      boxShadow: "lg",
    },
    _active: {
      bgColor: "#a1080f",
    },
  };

  if (to) {
    return (
      <Button as={RouterLink} to={to} {...baseStyle} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button {...baseStyle} {...props}>
      {children}
    </Button>
  );
};
