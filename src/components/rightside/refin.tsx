import { Box, Flex } from "@chakra-ui/react"
import { InfoSection } from "./buscas"

export const Refin = () => {


  return (
    <Flex  justifyContent="space-between" margin={'0 auto'} bg={'#2D2772 '}  w={"80%"}
        m={"50px auto"}
        p={5}
        borderRadius={5}>
      <InfoSection title={"nova taxa"} />
      <InfoSection title={"saldo dev"} />
      <InfoSection title={"parcela"}   />
      <InfoSection title={"troco"}     />
      <InfoSection title={"prazo"}/>
    </Flex>
  )
}