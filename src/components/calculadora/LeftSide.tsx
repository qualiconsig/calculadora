import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { CalculatorForm } from "./datasystem/form"
import {CalculateRealBalance} from './bankBalance'
import { useState } from "react";
import { resultProps } from "@/types";

export const LeftSide = ({calculated, formreceived, tax, taxaCalc}:any) => {

  const [formData, setFormData] = useState();
  const [calcResult, setCalcResult] = useState<resultProps[]>();

  const [dataSystem, setDataSystem] = useState(false)
  const [balanceBank, setBalanceBank] = useState(false)
  
  const handleFormData = ( dataform:any ) => {
    setFormData(dataform)
    formreceived(dataform)
  };

  const handleCalc = (datacalc:any) => {
    setCalcResult(datacalc)
    calculated(datacalc)

  }
  const handleSelectDataSis = () => {
    if(balanceBank) {
      setBalanceBank(false)
    }
      setDataSystem(true)
    }
    
  
  const handleSelectBank = () => {
    if(dataSystem === true) {
      setDataSystem(false)
      
    }
    setBalanceBank(true)
    
  }

  return (
    <Box
    flex={1}
    bg={"#FFF"}
    color={"white"}
    w={['100vw',"100vw",'40vw', '35vw',  '100%']}
   
  >
    
    <Box w={"90%"} h={'100vh'} m={"0 auto"} mt={10} color={"black"}>
      
      <Text fontSize={20}>Simulação calculadora </Text>
      <Text mt={2} mb={2}>Preencher somente os dados em amarelo</Text>
      <Box w={"100%"} >
        <Flex gap={'40px'}mt={2} justify={'center'} w={['80%', '80%','80%','80%', '100%']}>
          <Button fontSize={'13px'} onClick={handleSelectDataSis}> SALDO REAL </Button>
          <Button fontSize={'13px'} onClick={handleSelectBank}>DADOS SISTEMA</Button>
        </Flex>
        {dataSystem === true &&
        <CalculatorForm calculated={handleCalc} formreceived={handleFormData} taxx={tax}/>
        }
        {balanceBank === true &&
        <CalculateRealBalance calculated={handleCalc} formreceived={handleSelectBank} taxx={tax}/>
        }
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