import { InfoSection, InfoVal } from "@/components/rightside/buscas";
import { AllText } from "@/components/utils/alltext";
import { Box, Flex, Text } from "@chakra-ui/react";

export const Port = ({ bank, color }: any) => {
  return (
    <Box flex={1} mt={"20px"} w={"100%"}>
      <Text color={"#bbd5ed"} fontSize={["13px", "15px", "15px"]}></Text>
      <Flex gap={"20px"} bg={color} p={'20px'} borderRadius={"8px"} >

        <Flex w={'100%'} gap={'20px'}>
          <Box>
            <Text h={'40px'} mb={'20px'}>Bancos</Text> 
            <Box>
              <AllText text='Inbursa' color='purple.400'/>
              <AllText text='C6' color='black'/>
              <AllText text='Pagbank' color='green.500'/> 
              <AllText text='Pagbank' color='green.500'/> 
              <AllText text='Inbursa' color='purple.400'/> 
              <AllText text='C6' color='black'/>
            </Box> 
          </Box>

          <Box textAlign={'center'}>
            <Text h={'40px'} mb={'20px'}>Nova taxa</Text> 
            <Box>
              <AllText text='2.0%' color='purple.400'/>
              <AllText text='1.75%' color='black'/>
              <AllText text='1.66%' color='green.500'/> 
              <AllText text='1.60%' color='green.500'/> 
              <AllText text='1.56%' color='purple.400'/> 
              <AllText text='1.50%' color='black'/>
            </Box> 
          </Box>

          <Box textAlign={'center'}>
            <Text h={'40px'} mb={'20px'}>Nova parcela</Text> 
            <Box>
              <AllText text='582,93' color='purple.400'/>
              <AllText text='579,37' color='black'/>
              <AllText text='572,37' color='green.500'/> 
              <AllText text='561,71' color='green.500'/> 
              <AllText text='554,54' color='purple.400'/> 
              <AllText text='542,15' color='black'/>
            </Box> 
          </Box>

          <Box>
            <Text h={'40px'} mb={'20px'}>Eco. mensal cliente</Text> 
            <Box textAlign={'center'}>
              <AllText text='2,93' color='purple.400'/>
              <AllText text='6,37' color='black'/>
              <AllText text='13,37' color='green.500'/> 
              <AllText text='23,71' color='green.500'/> 
              <AllText text='14,54' color='purple.400'/> 
              <AllText text='30,15'  color='black'/>
            </Box> 
          </Box>

          <Box>
            <Text h={'40px'} mb={'20px'}>Eco do cliente total</Text> 
            <Box textAlign={'center'}>
              <AllText text='197,55' color='purple.400'/>
              <AllText text='476,31' color='black'/>
              <AllText text='1.036,00' color='green.500'/> 
              <AllText text='232,71' color='green.500'/> 
              <AllText text='1224,54' color='purple.400'/> 
              <AllText text='3220,15' color='black'/>
            </Box> 
          </Box>

        </Flex>
        
      </Flex>
    </Box>
  );
};
