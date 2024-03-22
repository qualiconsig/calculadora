import { Flex, Text } from "@chakra-ui/react";

export const BoxResult = ({ item, icon, index }: any) => {
  return (
    <Flex w={"100%"}>
      <Text
        mb={"5px"}
       
        key={index}
        fontSize={['10px', '13px', '15px', '15px', '16px']}  w={['100%','80%','100%']}
      >
        {" "}
       {item}{" "}
      </Text>
      <Text fontSize={['10px', '13px', '15px', '15px', '16px']}  w={['100%','80%','100%']} >{icon}</Text>
    </Flex>
  );
};
