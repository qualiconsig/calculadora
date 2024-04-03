'use client'
import React, { useEffect, useRef, useState } from "react";
import qualiconsig from "../../../../public/qualiconsi.png";
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
  Center,
  Spinner,
} from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Image from "next/image";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";
import { LiaFileContractSolid } from "react-icons/lia";

export const Port = ({ color, data, sd, taxa, valorAtualParcela }: any) => {
  const [screentext, setScreenText] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null);
  const [ordenedList, setOrdenedList] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

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
  };

  const handleCaptured = () => {
    setIsCapturing(true);
    
      if (captureRef.current) {
        html2canvas(captureRef.current, { useCORS: true })
          .then((canvas) => {
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
                      setIsCapturing(false);
                      setTimeout(() => {
                        setScreenText("");
                      }, 4000);
                    })
                    .catch((err) => {
                      console.error(
                        "Erro ao copiar a captura de tela para a área de transferência:",
                        err
                      );
                      setIsCapturing(false);
                    });
                } else {
                  console.error("Erro ao criar o blob da captura.");
                  setIsCapturing(false);
                }
              }, "image/png");
            } else {
              console.error("Erro ao criar o canvas da captura.");
              setIsCapturing(false);
            }
          })
          .catch((error) => {
            console.error("Erro ao capturar a tela:", error);
            setIsCapturing(false);
          });
      } else {
        console.error("Elemento de captura não encontrado.");
        setIsCapturing(false);
      }
    
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const handleBankSelect = (bank: string | null) => {
    setSelectedBank(bank);
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

  return (
    <>
      <Flex justify="center" gap={4}>
        <Text
          color={selectedBank === "Inbursa" ? "purple" : "gray"}
          cursor="pointer"
          onClick={() => handleBankSelect("Inbursa")}
        >
          Inbursa
        </Text>
        <Text
          color={selectedBank === "Pagbank" ? "green" : "gray"}
          cursor="pointer"
          onClick={() => handleBankSelect("Pagbank")}
        >
          Pagbank
        </Text>
        <Text
          color={selectedBank === "C6" ? "black" : "gray"}
          cursor="pointer"
          onClick={() => handleBankSelect("C6")}
        >
          C6
        </Text>
        <Text
          color={!selectedBank ? "blue" : "gray"}
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
                  display={
                    selectedBank && selectedBank !== item.nameBank
                      ? "none"
                      : "table-row"
                  }
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
                    )}{" "}
                    <SlArrowDown />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Box>
      <Modal isOpen={isModalOpen}  onClose={handleCloseModal} size="full">
        <ModalOverlay />
        <ModalContent
          
          borderRadius={"14px"}
          boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
          bgGradient='linear(to-r, #87CEEB  ,#1E90FF )'
          ref={captureRef}
          
        >
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            color="cyan.500"
            textAlign="center"
            
          >
            <Box w={"200px"} h={"100px"}>
              <Image src={qualiconsig} alt="Logo quali" />
            </Box>
            <Text color={'blue.800'}>Resumo da Proposta</Text>
            
          </ModalHeader>
          <ModalCloseButton color="gray.500" />
          <ModalBody>
            <Flex
              direction="column"
              gap={4}
              marginBottom="20px"
            
              style={{
                padding: "2px",
              }}
            >
              <Flex gap={2}>
                <Text fontWeight="bold">Banco:</Text>
                <Text>{selectedItem ? selectedItem.nameBank : ""}</Text>
              </Flex>
              {selectedItem && (
                <Flex direction={{ base: "column", md: "row" }} gap={4}>
                  {/* Contrato Atual */}
                  <Box
                    flex={1}
                    bg={"#6699CC"}
                    p={4}
                    borderRadius={"12px"}
                    boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
                  >
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

                  <Box
                    flex={1}
                    bg={"#6699CC"}
                    p={4}
                    borderRadius={"12px"}
                    boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
                  >
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

                  <Box
                    flex={1}
                    bg={"#6699CC"}
                    p={4}
                    borderRadius={"12px"}
                    boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
                  >
                    <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
                      Economia do cliente
                    </Text>
                    <Flex flexDirection="column" gap={2} >
                      <Flex justifyContent="space-between">
                        <Text fontWeight={"500"}>Economia mensal:</Text>
                        <Text>
                          R${" "}
                          {formatNumber(
                            (
                              selectedItem.parcelaAtual - selectedItem.pmt
                            ).toFixed(2)
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
          <Flex justify={"center"} gap={5} mb="50px">
            <Flex align={"center"} gap={1}>
              <FaPhoneAlt />
              <Text fontWeight={"600"}>Contato</Text>
              <Text fontWeight={'500'} color={'gray.800'}>: 0800 888 5842</Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              <MdOutlineMailOutline />
              <Text  fontWeight={'500'} color={'gray.800'}>contato@qualiconsig.com.br</Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              <LiaFileContractSolid />

              <Text fontWeight={"600"}>CNPJ:</Text>
              <Text fontWeight={'500'} color={'gray.800'}> 27.733.374/0001-72</Text>
            </Flex>
          </Flex>
          <ModalFooter justifyContent="center">
            <Flex>
              {isCapturing ? (
                <Center>
                  <Spinner size="lg" />
                  <Text ml={2}>Capturando...</Text>
                </Center>
              ) : (
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
              )}
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
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
