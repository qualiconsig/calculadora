import { Flex, Text } from "@chakra-ui/react";
import { ListRight } from "..";
import { resultProps } from "@/types";

export const handleMap = ({result, texto}:any) => {
  return (
    <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontWeight={"600"}>
        {texto}
      </Text>
      {result?.map((item: resultProps, index: number) => (
        <ListRight item={item.novaParcela} index={index} />
      ))}
    </Flex>
  );
};
