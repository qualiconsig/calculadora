
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
  const [ordenedList, setOrdenedList] = useState<any[]>([]);

  useEffect(() => {
    const formattedData: any[] = [];
    data.forEach((element: any) => {
      const tax = element.taxas;
      for (let i = 0; i < tax.length; i++) {
        const obj = {
          nameBank: element.nameBank,
          tax: tax[i],
          pmt: element.pmt[i],
          parcelaAtual: element.parcelaAtual,
          parcelaRestante: element.parcelaRestante
        };
        formattedData.push(obj);
      }
    });

    // Ordenar a lista pelo valor da taxa
    formattedData.sort((a, b) => a.tax - b.tax);

    

    setOrdenedList(formattedData);

    
  }, [data]);
  const getRowColor = (nameBank: string) => {
    // Definindo a cor com base no nome do banco
    switch (nameBank) {
      case 'Pagbank':
        return 'green';
      case 'Inbursa':
        return 'purple';
      case 'C6':
        return 'black';
      default:
        return color;
    }
  };
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
              {ordenedList.map((item, index) => (
                <Tr key={index} style={{ backgroundColor: getRowColor(item.nameBank) }}>
                  <Td>{item.nameBank}</Td>
                  <Td>{item.tax}</Td>
                  <Td>{item.pmt}</Td>
                  <Td>{item.parcelaAtual}</Td>
                  <Td>{item.parcelaRestante}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};

