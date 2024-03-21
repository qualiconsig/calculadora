import { Flex, Text } from "@chakra-ui/react";

export const BoxResult = ({ item, icon, index }: any) => {
  return (
    <Flex w={"100%"}>
      <Text
        mb={"5px"}
       
        key={index}
        fontSize={["13px", "13px", "13px", "14px", "15px"]}
      >
        {" "}
        {item}{" "}
      </Text>
      <Text w={"80%"}>{icon}</Text>
    </Flex>
  );
};
