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
  Tooltip,
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import html2canvas from "html2canvas";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";

export const Port = ({ color, data, sd, taxa, valorAtualParcela }: any) => {
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
              const item = new ClipboardItem({ "image/png": blob });
              navigator.clipboard
                .write([item])
                .then(() => {
                  setScreenText(
                    "Captura de tela copiada para a área de transferência!"
                  );
                  setTimeout(() => {
                    setScreenText("");
                  }, 2000);
                })
                .catch((err) => {
                  console.error(
                    "Erro ao copiar a captura de tela para a área de transferência:",
                    err
                  );
                });
            } else {
              console.error("Erro ao criar o blob da captura.");
            }
          }, "image/png");
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
  console.log("saldo", data);
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
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const formatNumber = (number: any) => {
    // Separar a parte inteira dos centavos
    const parts = number.toString().split(".");
    // Formatar a parte inteira com ponto como separador de milhares
    const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Se houver centavos, adicionar a vírgula e os centavos
    const formattedDecimal = parts[1] ? `,${parts[1]}` : "";
    // Retornar o número formatado
    return formattedInteger + formattedDecimal;
  };
  console.log(selectedItem);
  return (
    <>
      <Box mt={4} mx="auto" maxWidth="800px">
        <Flex justify="center" align="center" mb={4}>
          <Text fontSize={["xl", "2xl"]} color="#bbd5ed" fontWeight="bold">
            Portabilidade
          </Text>
        </Flex>
        <Flex
          bg={color}
          p={4}
          borderRadius="8px"
          overflowX="auto"
          boxShadow="md"
          mb={8}
        >
          <Table variant="simple" fontSize={["sm", "md"]} w="100%">
            <TableCaption color="white">Portabilidade</TableCaption>
            <Thead>
              <Tr>
                <Th color="yellow">Bancos</Th>
                <Th color="yellow">Nova taxa</Th>
                <Th color="yellow">Nova parcela</Th>
                <Th color="yellow">Economia mensal cliente</Th>
                <Th color="yellow">Economia total período</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ordenedList.map((item, index) => (
                <Tr
                  key={index}
                  onClick={() => handleRowClick(item)}
                  cursor="pointer"
                  _hover={{ bg: getRowColor(item.nameBank) }}
                >
                  <Td>{item.nameBank}</Td>
                  <Td>{formatNumber(item.tax)}</Td>
                  <Td>{formatNumber(item.pmt)}</Td>
                  <Td>
                    {formatNumber((item.parcelaAtual - item.pmt).toFixed(2))}
                  </Td>
                  <Td>
                    {formatNumber(
                      (
                        (item.parcelaAtual - item.pmt) *
                        item.parcelaRestante
                      ).toFixed(2)
                    )}{" "}
                    <SlArrowDown />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="6xl">
  <ModalOverlay />
  <ModalContent bg={"#f4f4f4"} borderRadius={"20px"} boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}>
    <ModalHeader
      fontSize="2xl"
      fontWeight="bold"
      color="cyan.500"
      textAlign="center"
    >
      Resumo da Proposta
    </ModalHeader>
    <ModalCloseButton color="gray.500" />
    <ModalBody ref={captureRef}>
      <Flex direction="column" gap={4} marginBottom="20px">
        <Flex gap={2}>
          <Text fontWeight="bold">Banco:</Text>
          <Text>{selectedItem ? selectedItem.nameBank : ""}</Text>
        </Flex>
        {selectedItem && (
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            {/* Contrato Atual */}
            <Box flex={1} bg={"#ffffff"} p={4} borderRadius={"12px"} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}>
              <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
                Contrato Atual
              </Text>
              <Flex flexDirection="column" gap={2}>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Taxa Atual:</Text>
                  <Text>{taxa} %</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Parcela Atual:</Text>
                  <Text>
                    R${" "}
                    {formatNumber(selectedItem.parcelaAtual.toFixed(2))}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>
                    Saldo Devedor Aproximado:
                  </Text>
                  <Text>R$ {sd}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Parcela restante:</Text>
                  <Text>{selectedItem.parcelaRestante}</Text>
                </Flex>
              </Flex>
            </Box>

            {/* Novo Contrato */}
            <Box flex={1} bg={"#ffffff"} p={4} borderRadius={"12px"} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}>
              <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
                Novo contrato
              </Text>
              <Flex flexDirection="column" gap={2}>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Nova taxa:</Text>
                  <Text>{selectedItem.tax.toFixed(2)} %</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Nova parcela:</Text>
                  <Text>
                    R$ {formatNumber(selectedItem.pmt.toFixed(2))}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Parcela restante:</Text>
                  <Text>{selectedItem.parcelaRestante}</Text>
                </Flex>
              </Flex>
            </Box>

            {/* Economia do Cliente */}
            <Box flex={1} bg={"#ffffff"} p={4} borderRadius={"12px"} boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}>
              <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
                Economia do cliente
              </Text>
              <Flex flexDirection="column" gap={2}>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Economia mensal:</Text>
                  <Text>
                    R${" "}
                    {formatNumber(
                      (selectedItem.parcelaAtual - selectedItem.pmt).toFixed(
                        2
                      )
                    )}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontWeight={"500"}>Economia Total:</Text>
                  <Text>
                    R${" "}
                    {formatNumber(
                      (
                        (selectedItem.parcelaAtual - selectedItem.pmt) *
                        selectedItem.parcelaRestante
                      ).toFixed(2)
                    )}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        )}
      </Flex>
    </ModalBody>
    <ModalFooter justifyContent="center">
      <Tooltip
        label="Capturar Tela"
        placement="top"
        hasArrow
        bg="gray.800"
        color="white"
      >
        <Button
          bg="cyan.500"
          _hover={{ bg: "cyan.600" }}
          onClick={handleCaptured}
          leftIcon={<FiCheckCircle />}
          size="lg"
        >
          Capturar
        </Button>
      </Tooltip>
      <Button
        ml={4}
        bg="gray.500"
        _hover={{ bg: "gray.600" }}
        onClick={handleCloseModal}
        leftIcon={<FiXCircle />}
        size="lg"
      >
        Fechar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
};
