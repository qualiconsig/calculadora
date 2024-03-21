import { Text } from "@chakra-ui/react";

export const TextResponse = ({ item, rest }: any) => {
  return (
    <Text
      mb={"5px"}
     
      fontSize={["13px", "13px", "13px", "14px", "15px"]}
      {...rest}
    >
      {item}
    </Text>
  );
};
