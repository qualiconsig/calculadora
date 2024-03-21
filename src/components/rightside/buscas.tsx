import { Flex, Text } from "@chakra-ui/react";

export  function InfoSection({ title, items,icon }:any) {
  return (
    <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontWeight={"600"}>
        {title}
      </Text>
     
      {items?.map((item:any, index:any) => (
        <Text  w={['80%']} key={index}>{icon} {item} </Text>
      ))}
    </Flex>
  );
}

export function SaldoDev ({title, saldo}:any) {

  return (
  <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontWeight={"600"}>
        {title}
      </Text>
        <Text > {saldo} </Text>
        <Text > {saldo} </Text>
        <Text > {saldo} </Text>
        <Text > {saldo} </Text>
        <Text > {saldo} </Text>
    </Flex>
)
}

export  function InfoVal({ title, items,icon }:any) {
  return (
    <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontWeight={"600"}>
        {title}
      </Text>

      {items?.map((item:any, index:any) => (
        <Flex w={'100%'}>
            <Text  w={'50%'}  key={index}> {item} </Text><Text w={'80%'}>{icon}</Text>
        </Flex>
      ))}
    </Flex>
  );
}