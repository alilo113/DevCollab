import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

export function Output() {
  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button variant="outline" colorScheme="green" mb={4}>
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor="#333"
      >
        Click "Run Code" to see the output here
      </Box>
    </Box>
  );
}