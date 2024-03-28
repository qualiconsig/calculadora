import { Box, Flex, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

export const Port = ({color, data, sd,taxa }: any) => {
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
      <Text color={"#bbd5ed"} fontSize={["12px", "15px", "15px"]}></Text>
      <Flex gap={"20px"} bg={color} p={"20px"} borderRadius={"8px"} overflowX="auto">
        <Table variant="simple" fontSize={['10px', '12px', '12px', '13px', '15px']}>
          <TableCaption color={"white"}>Portabilidade</TableCaption>
          <Thead>
            <Tr>
              <Th color={'yellow'}>Bancos</Th>
              <Th color={"yellow"}>Nova taxa</Th>
              <Th color={"yellow"}>Nova parcela</Th>
              <Th color={"yellow"}>Economia mensal cliente</Th>
              <Th color={"yellow"}>Economia total período</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ordenedList.map((item, index) => (
              
              <Tr key={index} style={{ backgroundColor: getRowColor(item.nameBank) }}>
                <Td>{item.nameBank}</Td>
                <Td>{item.tax}</Td>
                <Td>{item.pmt}</Td>
                <Td>{item.parcelaAtual - item.pmt}</Td>
                <Td><Link href={`calculator/page/${item.nameBank}-${item.tax}-${item.parcelaAtual}-${sd}-${taxa}-${item.pmt}-${item.parcelaRestante}-${item.parcelaAtual - item.pmt}-${(item.parcelaAtual - item.pmt) * item.parcelaRestante}`}>{(item.parcelaAtual - item.pmt) * item.parcelaRestante} <SlArrowDown /></Link></Td>
                
              </Tr>
              
            ))}
          </Tbody>
          
        </Table>
      </Flex>
    </Box>
  );
};
