import { TextResponse } from "@/components/utils/TextResults/TextResult"
import { Box, Text } from "@chakra-ui/react"

export const Prazo = ({prazo}:any) => {

  return (
    <Box>
     <Text color={"#F8D23A"} fontSize={['10px', '13px', '15px', '15px', '16px']}  w={['100%','80%','100%']} mr={['10px', '5px', '0px']} fontWeight={"600"} mb={'10px'}>
        Prazo
      </Text>
      <Box>
        <TextResponse item={'84'}/>
        <TextResponse item={'84'}/>
        <TextResponse item={'84'}/>
        <TextResponse item={'84'}/>
        <TextResponse item={'84'}/>
      </Box>
    </Box>
  )
}