import { Box, Flex, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

export const Port = ({ color, data, sd, taxa }: any) => {
  const [ordenedList, setOrdenedList] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
                <Tr key={index} style={{ backgroundColor: getRowColor(item.nameBank) }} onClick={() => handleRowClick(item)}>
                  <Td>{item.nameBank}</Td>
                  <Td>{item.tax}</Td>
                  <Td>{item.pmt}</Td>
                  <Td>{item.parcelaAtual - item.pmt}</Td>
                  <Td>
                    <div>
                      {(item.parcelaAtual - item.pmt) * item.parcelaRestante} <SlArrowDown />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="80%">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedItem && (
              <div>
                <Flex gap={2}>Banco: <Text fontWeight={'600'}>{selectedItem.nameBank} </Text></Flex>
                <Flex gap={2}>Nova Taxa: <Text fontWeight={'600'}>{selectedItem.tax}</Text></Flex>
                <Flex gap={2}>Nova Parcela: <Text fontWeight={'600'}>{selectedItem.pmt}</Text></Flex>
                <Flex gap={2}>Economia Mensal Cliente: <Text fontWeight={'600'}>{selectedItem.parcelaAtual - selectedItem.pmt}</Text></Flex>
                <Flex gap={2}>Economia Total Período: <Text fontWeight={'600'}>{(selectedItem.parcelaAtual - selectedItem.pmt) * selectedItem.parcelaRestante}</Text></Flex>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {/* Se necessário, adicione botões de ação no rodapé do modal */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
