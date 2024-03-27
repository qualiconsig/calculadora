
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
import { useContext, useEffect } from "react";

export const Port = ({ bank, color }: any) => {
  
  const {name, setName} = useNameContextHook();
  const {inbursatax ,setInbursaTax } = useInbursaContextHook()
  const {c6tax , setC6Tax} = useC6ContextHook()

  const porp = () => {
    const pagbank = name?.formdata
    const inbursa = inbursatax?.formdata
    const c6 = c6tax?.formdata
    
    const allbank = {
      pagbank,
      inbursa,
      c6
    }
    
    console.log(allbank)
  }

  useEffect(()=> {
    porp()
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
            {name?.formdata.taxas.map((item, index) => (
              <Tr key={index}>
                <Td>{bank}</Td>
                <Td>{item}</Td>
                <Td>{name.formdata.pagbankpmt[index]}</Td>
                <Td>{name.formdata.parcelaAtual - name.formdata.pagbankpmt[index]}</Td>
                <Td>{(name.formdata.parcelaAtual - name.formdata.pagbankpmt[index]  ) * name.formdata.parcelaRestante}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  </Box>
  );
};
