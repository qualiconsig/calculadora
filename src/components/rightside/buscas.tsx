import { Flex, Text } from "@chakra-ui/react";

export  function InfoSection({ title, items,icon }:any) {
  return (
    <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontWeight={"600"}>
        {title}
      </Text>
      {items?.map((item:any, index:any) => (
        
        <Text key={index}>{item} {icon}</Text>
      ))}
    </Flex>
  );
}