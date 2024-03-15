import { Box, Button, Flex, Input, Link } from "@chakra-ui/react";

import { CiSearch } from "react-icons/ci";

export default function Home () {

  return (
    <Flex background={'cyan.700'} h={'100vh'} align={'center'}>
      <Flex margin={'0 auto'} gap={10} flexDir={'column'}  >
        <Link href={'/calculadora/pagbank'}><Button w={'100px'} h={20} >Simular</Button></Link>
      </Flex>
    </Flex>
  )
}