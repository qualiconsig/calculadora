import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Box,
  Flex,
  Text,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import { SlArrowDown } from "react-icons/sl";

export const Port = ({ data, sd }: any) => {
  const [ordenedList, setOrdenedList] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const captureRef = useRef<HTMLDivElement>(null);

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
                  console.log("Captura de tela copiada para a área de transferência!");
                })
                .catch((err) => {
                  console.error("Erro ao copiar a captura de tela para a área de transferência:", err);
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

  const formatNumber = (number: any) => {
    // Formatar o número com ponto como separador de milhares
    return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(number);
  };

  // Método para filtrar os dados com base no banco selecionado
  const filterDataByBank = () => {
    if (!selectedBank) return ordenedList; // Retorna os dados ordenados se nenhum banco estiver selecionado
    return ordenedList.filter((item) => item.nameBank === selectedBank);
  };

  // Método para lidar com a seleção de banco
  const handleBankSelect = (bank: any) => {
    setSelectedBank(bank);
  };

  // Método para definir a cor com base no nome do banco
  const getBankColor = (nameBank: string) => {
    switch (nameBank) {
      case "Pagbank":
        return "green";
      case "Inbursa":
        return "purple";
      case "C6":
        return "black";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Flex justify="center" gap={4}>
        <Text
          color={selectedBank === "Inbursa" ? "purple" : "gray.500"}
          cursor="pointer"
          onClick={() => handleBankSelect("Inbursa")}
        >
          Inbursa
        </Text>
        <Text
          color={selectedBank === "Pagbank" ? "green" : "gray.500"}
          cursor="pointer"
          onClick={() => handleBankSelect("Pagbank")}
        >
          Pagbank
        </Text>
        <Text
          color={selectedBank === "C6" ? "black" : "gray.500"}
          cursor="pointer"
          onClick={() => handleBankSelect("C6")}
        >
          C6
        </Text>
        <Text
          color={!selectedBank ? "blue.500" : "gray.500"}
          cursor="pointer"
          onClick={() => handleBankSelect(null)}
        >
          Todos
        </Text>
      </Flex>

      <Box mt={4} mx="auto" maxWidth="800px">
        <Flex justify="center" align="center" mb={4}>
          <Text fontSize={["xl", "2xl"]} color="#bbd5ed" fontWeight="bold">
            Portabilidade
          </Text>
        </Flex>
        <Flex
          bg="gray.500"
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
              {filterDataByBank().map((item, index) => (
                <Tr
                  key={index}
                  onClick={() => setIsModalOpen(true)}
                  cursor="pointer"
                  _hover={{ bg: getBankColor(item.nameBank) }}
                >
                  <Td>{item.nameBank}</Td>
                  <Td>{formatNumber(item.tax.toFixed(2))}</Td>
                  <Td>{formatNumber(item.pmt.toFixed(2))}</Td>
                  <Td>
                    {formatNumber((item.parcelaAtual - item.pmt).toFixed(2))}
                  </Td>
                  <Td>
                    {formatNumber(
                      (
                        (item.parcelaAtual - item.pmt) *
                        item.parcelaRestante
                      ).toFixed(2)
                    )}
                    <SlArrowDown />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="6xl">
        <ModalOverlay />
        <ModalContent
          bg={"#f4f4f4"}
          borderRadius={"20px"}
          boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        >
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
              <Text fontWeight="bold">Banco: {selectedBank}</Text>
              {/* Adicione aqui o restante do conteúdo do modal */}
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
              onClick={() => setIsModalOpen(false)}
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
