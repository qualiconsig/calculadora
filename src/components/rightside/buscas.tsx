import { Flex, Text } from "@chakra-ui/react";
import { TextResponse } from "../utils/TextResults/TextResult";
import { BoxResult } from "../utils/TextResults/BoxResult";

const breakpoints = {
  base: "0em", // 0px
  sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
};

export  function InfoSection({ title, items,icon }:any) {
  return (
    <Flex flexDir={"column"} align={"center"} >
      <Text color={"#F8D23A"} fontSize={['13px', '13px', '15px', '15px', '16px']}  w={['40%','80%','100%']} mr={['10px', '5px', '0px']} fontWeight={"600"} mb={'10px'}>
        {title}
      </Text>
     
      {items?.map((item:any, index:any) => (
        <Text fontSize={['13px', '13px', '13px', '14px', '15px']}  mb={'5px'} w={'80%'} key={index}>{icon} {item} </Text>
      ))}
    </Flex>
  );
}

export function SaldoDev ({title, saldo}:any) {

  return (
  <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontSize={['13px', '13px', '15px', '15px', '16px']} fontWeight={"600"} mr={['10px', '5px', '0px']} mb={'10px'}>
        {title}
      </Text>
        <TextResponse item={saldo}/> 
        <TextResponse item={saldo}/>
        <TextResponse item={saldo}/>
        <TextResponse item={saldo}/>
        <TextResponse item={saldo}/>
    </Flex>
)
}

export  function InfoVal({ title, items,icon }:any) {
  return (
    <Flex flexDir={"column"} align={"center"}>
      <Text color={"#F8D23A"} fontWeight={"600"} fontSize={['13px', '13px', '15px', '15px', '16px']}  mr={['10px', '5px', '0px']} mb={'10px'}>
        {title}
      </Text>

      {items?.map((item:any, index:any) => (
        <BoxResult item={item} index={index} icon={icon}/>
      ))}
    </Flex>
  );
}