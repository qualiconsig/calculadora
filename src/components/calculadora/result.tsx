// ResultSection.jsx
import { Flex, Text } from "@chakra-ui/react";
import { resultProps } from "@/types";
import { ListRight } from "@/components/rightside";

export default function ResultSection({ result }:any) {
  return (
    <Flex
      w={"80%"}
      m={"50px auto"}
      p={5}
      borderRadius={5}
      justifyContent="space-between"
      bg={"#2D2772"}
      color="white"
    >
      {/* Renderize os resultados aqui */}
    </Flex>
  );
}
