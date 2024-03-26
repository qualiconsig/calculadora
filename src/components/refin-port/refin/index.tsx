import { InfoSection, InfoVal } from "@/components/rightside/buscas";
import { AllText } from "@/components/utils/alltext";
import { useNameContextHook } from "@/context/mathContext";
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
} from "@chakra-ui/react";
import { useContext } from "react";

export const Port = ({ bank, color }: any) => {
  
  return (
    <Box  mt={"20px"}>
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
                <Th color={"yellow"}>Bancos</Th>
                <Th color={"yellow"}>Nova taxa</Th>
                <Th color={"yellow"}>Nova parcela</Th>
                <Th color={"yellow"}>Economia mensal cliente</Th>
                <Th color={"yellow"}>Economia total periodo</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr bg={"purple.700"}>
                <Td>Inbursa</Td>
                <Td>1,76</Td>
                <Td>583,32</Td>
                <Td>2,47</Td>
                <Td>194,76</Td>
              </Tr>
              <Tr bg={"black"}>
                <Td>C6</Td>
                <Td>1,76</Td>
                <Td>583,32</Td>
                <Td>2,47</Td>
                <Td>194,76</Td>
              </Tr>
              <Tr bg={"green.600"}>
                <Td>Pagbank</Td>
                <Td>1,76</Td>
                <Td>583,32</Td>
                <Td>2,47</Td>
                <Td>194,76</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        
      </Flex>
    </Box>
  );
};
