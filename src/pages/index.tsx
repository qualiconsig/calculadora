import { Box, Button, Flex, Input, Link } from "@chakra-ui/react";
import Image from "next/image";
import fundo from '../../public/fundo.jpg'
import { CiSearch } from "react-icons/ci";

export default function Home () {

  return (
    
    <Flex  h={'100vh'} align={'center'}>
      <Box position={'absolute'}><Image alt="fundo" src={fundo}/></Box>
      
      <Flex margin={'0 auto'} gap={10}  zIndex={999} >
        <Link href={'/calculadora/pagbank'}><Button  w={'150px'} color={'white'} boxShadow= "3px 2px 8px 3px rgba(0,0,0,0.75)" h={20} bg={'#2980B9'} _hover={{
          background: "#2675aa",
          padding:'5px',
          boxShadow: "-1px 1px 6px 2px rgba(0,0,0,0.75)"
        }}>Simulação</Button></Link>
        <Link href={'/calculadora/Calculadora'}><Button boxShadow= "3px 2px 8px 3px rgba(0,0,0,0.75)" color={'white'} w={'150px'} h={20}  bg={'#2980B9'} _hover={{
          background: "#2675aa",
          
          padding:'5px',
          boxShadow: "-1px 1px 6px 2px rgba(0,0,0,0.75)"
        }} >Calculadora</Button></Link>
      </Flex>
    </Flex>
  )
}