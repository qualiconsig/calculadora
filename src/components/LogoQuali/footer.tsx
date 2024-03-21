import { Box } from "@chakra-ui/react"
import Image from "next/image"
import quali from "../../../public/qualiconsig.png";

export const QualiFooter = () => {
  return (
    <Box position={"absolute"} right={10} bottom={[2, 10]} w={['120px','200px']}>
      <Image quality={100} src={quali} alt="logo" />
    </Box>
  )
}