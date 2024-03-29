import { Box, Flex } from "@chakra-ui/react"
import { InfoSection, SaldoDev } from "./buscas"
import { Taxas } from "@/math"
import { Prazo } from "../calculadora/prazo"

export const Refin = ({saldo, parcelaAtual, parcelaRest}:any) => {
  const arr = [100,78,56,47]

  return (
    <Flex  justifyContent="space-between" margin={'0 auto'} bg={'#2D2772 '}   w={["100%", "95%", "95%", '95%',  '80%']}
        m={"50px auto"}
        p={5}
        fontSize={['13px', '13px', '15px', '15px']}
        color={'white'}
        borderRadius={5}>
          
      <InfoSection title={"nova taxa"} items={Taxas?.map((item:any) => item)} icon={"%"}   />
      <SaldoDev title={"Saldo Dev"} saldo={saldo}  />
      <SaldoDev title={"parcela"}  saldo={parcelaAtual}  />
      <InfoSection title={"troco"}  items={arr?.map((item:any) => item)}  />
      <Prazo prazo={parcelaRest}   />
    </Flex>
  )
}