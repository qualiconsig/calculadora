import { InfoSection, InfoVal } from "@/components/rightside/buscas"
import { Box, Flex, Text } from "@chakra-ui/react"

export const Port = ({}) => {
  

  return (
    <Box mt={'20px'}>
      <Text>Banco: Inbursa</Text>
      <Flex gap={'20px'} bg={'#0B132B'} p={'20px'} borderRadius={'8px'}> 
          <Box>
            <Text>Nova Taxa</Text>
            <Box>
              <Text>1,72%</Text>
              <Text>1,70%</Text>
              <Text>1,66%</Text>
              <Text>1,60%</Text>
              <Text>1,56%</Text>
            </Box>
          </Box>
          <Box>
            <Text>Nova Parcela</Text>
            <Box>
              <Text>529.78</Text>
              <Text>526,45</Text>
              <Text>519,83</Text>
              <Text>509,97</Text>
              <Text>503,45</Text>
            </Box>
          </Box>    
          <Box>
            <Text>Economia Cliente Mensal</Text>
            <Box>
              <Text>37,59</Text>
              <Text>34,26</Text>
              <Text>27,64</Text>
              <Text>17,78</Text>
              <Text>11,26</Text>
            </Box>
          </Box> 
          <Box>
            <Text>Economia Total Periodo</Text>
            <Box>
              <Text>3082,59</Text>
              <Text>2.809,26</Text>
              <Text>2.266,64</Text>
              <Text>1.458,78</Text>
              <Text>932,26</Text>
            </Box>
          </Box>       
      </Flex>
    </Box>
  )
}