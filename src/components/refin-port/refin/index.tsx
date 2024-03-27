
import { InfoSection, InfoVal } from "@/components/rightside/buscas";
import { AllText } from "@/components/utils/alltext";
import { useC6ContextHook } from "@/context/C6Context";
import { useInbursaContextHook } from "@/context/InbursaContext";
import { useNameContextHook } from "@/context/pagbankContext";
import { NameProps } from "@/context/pagbankContext";
import { sortTaxas } from "@/sort";
import {
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  others,
} from "@chakra-ui/react";
import { all } from "axios";
import { useContext, useEffect, useState } from "react";

export const Port = ({ bank, color, data }: any) => {
  
  const {name, setName} = useNameContextHook();
  const {inbursatax ,setInbursaTax } = useInbursaContextHook()
  const {c6tax , setC6Tax} = useC6ContextHook()

  const [ordenedList, setOrdenedList] = useState<any>()

  const porp = () => {
    const pagbank = name?.formdata
    const inbursa = inbursatax?.formdata
    const c6 = c6tax?.formdata
    
    const allbank:any = [
      {pagbank},
      {inbursa},
      {c6}
    ]
    setOrdenedList(allbank)
    console.log(ordenedList)
    

  }

  useEffect(()=> {
   
    console.log(data)
    for(let i in data) {
      console.log(data[i].nameBank)
    }
  },[])
  
  return (
    <Box mt={"20px"}>
      
    <Text color={"#bbd5ed"} fontSize={["13px", "15px", "15px"]}></Text>
    <Flex gap={"20px"} bg={color} p={"20px"} borderRadius={"8px"}>
      <TableContainer
        margin={"0 auto"}
        h={"100%"}
        w={["100%", "60%", "70%", "85%", "100%"]}
        fontSize={["10px", "12px", "12px", "13px", "15px"]}
      >
        <Table variant="simple">
          <TableCaption color={"white"}>Portabilidade</TableCaption>
          <Thead>
            <Tr>
              <Th color={'yellow'}>Bancos</Th>
              <Th color={"yellow"}>Nova taxa</Th>
              <Th color={"yellow"}>Nova parcela</Th>
              <Th color={"yellow"}>Economia mensal cliente</Th>
              <Th color={"yellow"}>Economia total periodo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{item.nameBank}</Td>
                <Td>{item.taxas[index]}</Td>
                <Td>{item.pmt[index]}</Td>
                <Td>{item.parcelaAtual - item.pmt[index]}</Td>
                <Td>{(item.parcelaAtual - item.pmt[index]  ) * item.parcelaRestante}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  </Box>
  );
};
