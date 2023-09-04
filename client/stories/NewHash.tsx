import React from "react";
import Card from "@mui/joy/Card";
import Grid from "@mui/joy/Grid";
import Input from "@mui/joy/Input";

interface NewHashProps {
  width?: string;
}

export const NewHash = ({ width, ...props }: NewHashProps) => {
  return (
    <Card
      variant="soft"
      color="neutral"
      sx={{ width: width ?? "100%", height: "80px" }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={12}>
          <Input
            variant="plain"
            placeholder="What's on your mind?"
            color="neutral"
            sx={{
              background: "transparent",
              "outline": "none",
              "&.Mui-focused": { outline: "none" },
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
