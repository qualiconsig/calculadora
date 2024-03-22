import { Flex, Input, Text } from "@chakra-ui/react"

export const BoxForm = ({text, register, children}:any) => {

  return (
    <Flex mb={7} align={"center"} flexDir={'column'} >
    <Text mb={'10%'} h={'34px'} w={"100%"} textAlign={'center'} mt={'20px'} fontSize={'14px'}>{text}</Text>
    {children}
    </Flex>
  )
}