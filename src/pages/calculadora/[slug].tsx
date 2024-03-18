'use client'
import { resultProps } from "@/types";
import { Box, Button, Checkbox, Flex, Grid, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import quali from '../../../public/qualiconsig.png'
import Loading from "@/components/loading";
import { ListRight } from "@/components/rightside";

export default function Calculadora() {
  const route = useRouter();
  const r = route.query.slug;

  const [formData, setFormData] = useState()
  const [result, setResult] = useState<resultProps[]>()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>()
  const onSubmit: SubmitHandler<any> = async (data) => {
    setFormData(data)
    try {
      const response = await axios.post('http://127.0.0.1:8080/calculadora', {
        data
      })
      if(response) {
        setResult(response.data)
        console.log(result)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const activeLoading = () => {
    
    setTimeout(() => {
     setLoading(true)
      
    }, 3000); // 3000 milissegundos = 3 segundos
  };
  useEffect(()=>{
    activeLoading()
  },[])
  return (
    <>
    {loading === false && 
      <Loading/>
    } 
    {loading === true && 
    <Box w={"100vw"}>
      <Box w={"80%"}m="0 auto"></Box>
      <Flex>
        <Box
          h={'100vh'}
          flex={1}
          bg={"#FFF"}
          color={"white"}
          boxShadow={'1px 2px 2px red'}
        >
          <Box w={"90%"} m={"0 auto"} mt={10} color={'black'}>
            <Text fontSize={20}>Simulação calculadora </Text>
            <Box w={"100%"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex mt={20} mb={7}>
                  <Text w={"30%"}>Prazo inicial</Text>
                  <Input
                    focusBorderColor="white"
                    border={"1px solid #d6d0f5"}
                    bg={"#edeafd"}
                    w={"40%"}
                    {...register('prazo')}
                  />
                </Flex>
                <Flex mb={7}>
                  <Text w={"30%"}>Parcela Atual</Text>
                  <Input
                    focusBorderColor="white"
                    border={"1px solid #d6d0f5"}
                    bg={"#edeafd"}
                    w={"40%"}
                    {...register('parcela atual')}
                  />
                </Flex>
                <Flex mb={7}>
                  <Text w={"30%"}>Vl Emprestimo</Text>
                  <Input
                    focusBorderColor="white"
                    border={"1px solid #d6d0f5"}
                    bg={"#edeafd"}
                    
                    w={"40%"}
                    {...register('vl emprestimo')}
                  />
                </Flex>
                <Flex>
                  <Text w={"30%"}>Parcelas Pagas</Text>
                  <Input
                    
                    focusBorderColor="white"
                    border={"1px solid #d6d0f5"}
                    bg={"#edeafd"}
                    w={"40%"}
                    {...register('parcelaPaga')}
                  />
                </Flex>
                <Button mt={10} bg={'#3f5ee9'} color={'#FFF'} _hover={{
                  background: "#066986"
                }}  type="submit">Calcular</Button>
              </form>
            </Box>
            <Flex
              flexDir={"column"}
              mt={20}
              justify={"center"}
              align={"center"}
            >
              {/* <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <Text>Taxa atual</Text>
                  <Box bg={'#ffc'} border={'1px solid #f5ecb7'} p={4} borderRadius="full" textAlign="center">
                    <p>Quadrado 1</p>
                  </Box>
                </Box>
                <Box>
                  <Text>Parcelas restantes</Text>
                  <Box border={'1px solid #f5ecb7'} bg={'#ffc'} p={4} borderRadius="full" textAlign="center">
                    <p>Quadrado 2</p>
                  </Box>
                </Box>
                <Box>
                  <Text>Parcelas restantes</Text>
                  <Box border={'1px solid #f5ecb7'} bg={'#ffc'} p={4} borderRadius="full" textAlign="center">
                    <p>Quadrado 3</p>
                  </Box>
                </Box>
                <Box>
                  <Flex gap={5} justify={'center'} bg={'#ffc'}>
                  <Text>Saldo real</Text>
                 
                  <Checkbox color={'black'} />
                  </Flex>
                 
                 
                </Box>
                
              </Grid> */}
            </Flex>
          </Box>
        </Box>
        <Box flex={2} bg={'#436087'} >
        <Flex w={'80%'}  m={"50px auto"}  p={5} borderRadius={5}  justifyContent="space-between" bg={'#2D2772'} color="white">
        <Flex flexDir={'column'} align={'center'}>
          <Text color={'#F8D23A'} fontWeight={'600'}>Economia Mensal do Cliente</Text>
          {result?.map((item:resultProps, index:number) => (
            <ListRight item={item.economiaMensalCliente} index={index}/>
      ))}
        </Flex>
        <Flex flexDir={'column'} align={'center'} >
          <Text color={'#F8D23A'} fontWeight={'600'}>Nova Taxa</Text>
          {result?.map((item:resultProps, index:number) => (
          <ListRight item={item.novataxa} index={index}/>
      ))}
        </Flex>
        <Flex flexDir={'column'} align={'center'} >
          <Text color={'#F8D23A'} fontWeight={'600'}>Nova Parcela</Text>
          {result?.map((item:resultProps, index:number) => (
          <ListRight item={item.novaParcela} index={index}/>
      ))}
        </Flex>
        <Flex flexDir={'column'} align={'center'} >
          <Text color={'#F8D23A'} fontWeight={'600'}>Economia Total no Período</Text>
          {result?.map((item:resultProps, index:number) => (
         <ListRight item={item.economiaTotalPeriodo} index={index}/>
      ))}
        </Flex>
      </Flex>
      <Box position={'absolute'} right={10} bottom={10}>
         <Image quality={100} src={quali} alt="logo"/>
         </Box>
        </Box>
      </Flex>
      
    </Box>
    }
    </>
  );
}
