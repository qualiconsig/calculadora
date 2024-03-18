import { resultProps } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";

export const ListRight = ({ item, index }: any) => {
  return (
    <Flex key={index} justifyContent="space-between" color={"white"}>
      <Box>{item}</Box>
    </Flex>
  );
};
