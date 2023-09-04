import React from "react";
import JoyCard from "@mui/joy/Card";

interface CardProps {
  backgroundColor?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export const Card = ({
  backgroundColor,
  size,
  ...props
}: CardProps) => {
  return (
    <JoyCard
      size={size ? size : "md"}
      sx={{ backgroundColor: backgroundColor ? backgroundColor : "white" }}
    >
      {props.children}
    </JoyCard>
  );
};
