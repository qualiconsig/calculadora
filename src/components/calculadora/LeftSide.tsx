import { Box, Flex, Text } from "@chakra-ui/react"
import { CalculatorForm } from "./form"
import { useState } from "react";
import { resultProps } from "@/types";

export const LeftSide = ({calculated, formreceived}:any) => {

  const [formData, setFormData] = useState();
  const [calcResult, setCalcResult] = useState<resultProps[]>();
  const [loading, setLoading] = useState(false);

  const handleFormData = ( dataform:any ) => {
    setFormData(dataform)
    formreceived(dataform)
  };

  const handleCalc = (datacalc:any) => {
    setCalcResult(datacalc)
    calculated(datacalc)

  }
  return (
    <Box
    h={"100vh"}
    flex={1}
    bg={"#FFF"}
    color={"white"}
    boxShadow={"1px 2px 2px red"}
  >
    <Box w={"90%"} m={"0 auto"} mt={10} color={"black"}>
      <Text fontSize={20}>Simulação calculadora </Text>
      <Box w={"100%"}>
       <CalculatorForm calculated={handleCalc} formreceived={handleFormData}/>
      </Box>
      <Flex
        flexDir={"column"}
        mt={20}
        justify={"center"}
        align={"center"}
      >
      
      </Flex>
    </Box>
  </Box>
  )
}