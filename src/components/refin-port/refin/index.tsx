import { InfoSection, InfoVal } from "@/components/rightside/buscas";
import { AllText } from "@/components/utils/alltext";
import { Box, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export const Port = ({ bank, color }: any) => {
  return (
    <Box flex={1} mt={"20px"} w={"100%"}>
      <Text color={"#bbd5ed"} fontSize={["13px", "15px", "15px"]}></Text>
      <Flex gap={"20px"} bg={color} p={'20px'} borderRadius={"8px"} >

        <Flex w={'100%'} gap={'20px'}>
          <Box>
            <TableContainer>
                  <Table variant='simple'>
                      <TableCaption color={'white'}>Portabilidade</TableCaption>
                      <Thead >
                        <Tr>
                          <Th color={'yellow'}>Bancos</Th>
                          <Th color={'yellow'}>Nova taxa</Th>
                          <Th color={'yellow'}>Nova parcela</Th>
                          <Th color={'yellow'}>Economia mensal cliente</Th>
                          <Th color={'yellow'}>Economia total periodo</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr bg={'purple.700'}>
                          <Td>Inbursa</Td>
                          <Td>1,76</Td>
                          <Td>583,32</Td>
                          <Td>2,47</Td>
                          <Td>194,76</Td>
                        </Tr>
                        <Tr bg={'black'}>
                          <Td>C6</Td>
                          <Td>1,76</Td>
                          <Td>583,32</Td>
                          <Td>2,47</Td>
                          <Td>194,76</Td>
                        </Tr>
                        <Tr bg={'green.600'}>
                          <Td>Pagbank</Td>
                          <Td>1,76</Td>
                          <Td>583,32</Td>
                          <Td>2,47</Td>
                          <Td>194,76</Td>
                        </Tr>
                      </Tbody>
                  </Table>  
            </TableContainer>
           </Box>

        </Flex>
        
      </Flex>
    </Box>
  );
};
