import { Box, Button, Checkbox, Flex, Grid, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Calculadora() {
  const route = useRouter();
  const r = route.query.slug;

  const [formData, setFormData] = useState()

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
      console.log(response)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
   
  }
  return (
    <Box w={"100vw"}>
      <Box w={"80%"} m="0 auto"></Box>
      <Flex>
        <Box
         
          flex={1}
          bgGradient={"linear(to-r, #0BA360, #0BA360, #2DB382 )"}
          color={"white"}
        >
          <Box w={"90%"} m={"0 auto"} mt={10}>
            <Text fontSize={20}>Simular calculadora {r}</Text>
            <Box w={"100%"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex mt={20} mb={7}>
                  <Text w={"25%"}>Prazo inicial</Text>
                  <Input
                    focusBorderColor="white"
                    border={"none"}
                    bg={"black"}
                    w={"40%"}
                    {...register('prazo')}
                  />
                </Flex>
                <Flex mb={7}>
                  <Text w={"25%"}>Parcela Atual</Text>
                  <Input
                    focusBorderColor="white"
                    border={"none"}
                    bg={"black"}
                    w={"40%"}
                    {...register('parcela atual')}
                  />
                </Flex>
                <Flex mb={7}>
                  <Text w={"25%"}>Vl Emprestimo</Text>
                  <Input
                    focusBorderColor="white"
                    border={"none"}
                    bg={"black"}
                    w={"40%"}
                    {...register('vl emprestimo')}
                  />
                </Flex>
                <Flex>
                  <Text w={"25%"}>Parcelas Pagas</Text>
                  <Input
                    bg={"black"}
                    focusBorderColor="white"
                    border={"none"}
                    w={"40%"}
                    {...register('parcelaPaga')}
                  />
                </Flex>
                <Button type="submit">Calcular</Button>
              </form>
            </Box>
            <Flex
              flexDir={"column"}
              mt={20}
              justify={"center"}
              align={"center"}
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <Text>Taxa atual</Text>
                  <Box bg="blue.200" p={4} borderRadius="md" textAlign="center">
                    <p>Quadrado 1</p>
                  </Box>
                </Box>
                <Box>
                  <Text>Parcelas restantes</Text>
                  <Box bg="green.200" p={4} borderRadius="md" textAlign="center">
                    <p>Quadrado 2</p>
                  </Box>
                </Box>
                <Box>
                  <Text>Parcelas restantes</Text>
                  <Box bg="purple.200" p={4} borderRadius="md" textAlign="center">
                    <p>Quadrado 3</p>
                  </Box>
                </Box>
                <Box>
                  <Flex gap={5} justify={'center'}>
                  <Text>Saldo real</Text>
                 
                  <Checkbox/>
                  </Flex>
                 
                 
                </Box>
                
              </Grid>
            </Flex>
          </Box>
        </Box>
        <Box flex={1} bgGradient={"linear(to-r, #09203F, #537895)"}>
          d
        </Box>
      </Flex>
    </Box>
  );
}
