import {
  Box,
  Flex,
  Grid,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

export const Port = ({ color, data, sd, taxa }: any) => {
  const [screentext, setScreenText] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null);
  const [ordenedList, setOrdenedList] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCaptured = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        if (canvas) {
          canvas.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ 'image/png': blob });
              navigator.clipboard.write([item]).then(() => {
                setScreenText("Captura de tela copiada para a área de transferência!");
                setTimeout(() => {
                  setScreenText("");
                }, 2000);
              }).catch(err => {
                console.error("Erro ao copiar a captura de tela para a área de transferência:", err);
              });
            } else {
              console.error("Erro ao criar o blob da captura.");
            }
          }, 'image/png');
        } else {
          console.error("Erro ao criar o canvas da captura.");
        }
      });
    } else {
      console.error("Elemento de captura não encontrado.");
    }
  };

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
          parcelaRestante: element.parcelaRestante,
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
      case "Pagbank":
        return "green";
      case "Inbursa":
        return "purple";
      case "C6":
        return "black";
      default:
        return color;
    }
  };

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    console.log(selectedItem);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box mt={"20px"}>
        <Text color={"#bbd5ed"} fontSize={["12px", "15px", "15px"]}></Text>
        <Flex
          gap={"20px"}
          bg={color}
          p={"20px"}
          borderRadius={"8px"}
          overflowX="auto"
        >
          <Table
            variant="simple"
            fontSize={["10px", "12px", "12px", "13px", "15px"]}
          >
            <TableCaption color={"white"}>Portabilidade</TableCaption>
            <Thead>
              <Tr>
                <Th color={"yellow"}>Bancos</Th>
                <Th color={"yellow"}>Nova taxa</Th>
                <Th color={"yellow"}>Nova parcela</Th>
                <Th color={"yellow"}>Economia mensal cliente</Th>
                <Th color={"yellow"}>Economia total período</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ordenedList.map((item, index) => (
                <Tr
                  key={index}
                  style={{ backgroundColor: getRowColor(item.nameBank) }}
                  onClick={() => handleRowClick(item)}
                  cursor={"pointer"}
                >
                  <Td>{item.nameBank}</Td>
                  <Td>{item.tax}</Td>
                  <Td>{item.pmt}</Td>
                  <Td>{item.parcelaAtual - item.pmt}</Td>
                  <Td>
                    <div>
                      {(item.parcelaAtual - item.pmt) * item.parcelaRestante}{" "}
                      <SlArrowDown />
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
        <ModalContent ref={captureRef}>
          <ModalHeader color={'cyan.500'}>Resumo proposta</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedItem && (
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Text>Banco:</Text>
                <Text fontWeight={"600"}>{selectedItem.nameBank}</Text>
                <Text>Nova Taxa:</Text>
                <Text fontWeight={"600"}>{selectedItem.tax}</Text>
                <Text>Taxa antiga:</Text>
                <Text fontWeight={"600"}>{taxa}</Text>
                <Text>Nova Parcela:</Text>
                <Text fontWeight={"600"}>{selectedItem.pmt}</Text>
                <Text>Parcela Antiga:</Text>
                <Text fontWeight={"600"}>{selectedItem.parcelaAtual}</Text>
                <Text>Economia Mensal Cliente:</Text>
                <Text fontWeight={"600"}>
                  {selectedItem.parcelaAtual - selectedItem.pmt}
                </Text>
                <Text>Economia Total Período:</Text>
                <Text fontWeight={"600"}>
                  {(selectedItem.parcelaAtual - selectedItem.pmt) *
                    selectedItem.parcelaRestante}
                </Text>
              </Grid>
            )}
          </ModalBody>
          <ModalFooter>
            <Button alignItems={'center'} bg={'red.500'} _hover={{
              background: 'red.600'
            }} onClick={handleCaptured}>Capturar Tela</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
