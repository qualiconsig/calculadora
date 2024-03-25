import { Text } from "@chakra-ui/react"

export const AllText = ({text, color}:any) => {

  return (
    <Text mb={'10px'} color={color} fontWeight={'500'}>{text}</Text>
  )
}