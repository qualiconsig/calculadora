import { Box, Button, Flex, Input } from "@chakra-ui/react";
import Link from "next/link";

export default function Home () {

  return (
    <Flex background={'cyan.700'} h={'100vh'} align={'center'}>
      <Flex margin={'0 auto'} gap={10} flexDir={'column'}  >
        <Link href={'/calculadora/pagbank'}><Button w={20} bg={'green.500'} color={'white'}>Pagbank</Button></Link>
        <Link href={"/calculadora/c6"}><Button w={20} bg={'black'} color={'white'}>C6</Button></Link>
        <Link href={"/calculadora/inbursa"}><Button w={20} bg={'purple.700'} color={'white'}>Inbursa</Button></Link>
      </Flex>
    </Flex>
  )
}