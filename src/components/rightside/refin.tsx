import { Box, Flex } from "@chakra-ui/react"
import { InfoSection, SaldoDev } from "./buscas"
import { Taxas } from "@/math"

export const Refin = ({saldo, parcelaAtual}:any) => {
  const arr = [100,78,56,47]

  return (
    <Flex  justifyContent="space-between" margin={'0 auto'} bg={'#2D2772 '}  w={"80%"}
        m={"50px auto"}
        p={5}
        color={'white'}
        borderRadius={5}>
      <InfoSection title={"nova taxa"} items={Taxas?.map((item:any) => item)}  />
      <SaldoDev title={"Saldo Dev"} saldo={saldo}  />
      <SaldoDev title={"parcela"}  saldo={parcelaAtual}  />
      <InfoSection title={"troco"}  items={arr?.map((item:any) => item)}  />
      <InfoSection title={"prazo"}  items={arr?.map((item:any) => item)}  />
    </Flex>
  )
}