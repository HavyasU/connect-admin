import React from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={4}>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
      <Box mt={4}>The current color mode is: {colorMode}</Box>
    </Box>
  );
}

export default ThemeToggle;
