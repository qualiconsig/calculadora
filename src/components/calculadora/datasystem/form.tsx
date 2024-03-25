// CalculatorForm.jsx

import { resultProps } from "@/types";
import { form } from "@/types/mod";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function CalculatorForm({ calculated, formreceived, taxx }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<form>();
  const [result, setResult] = useState<resultProps[]>();
  const onSubmit: SubmitHandler<any> = async (data) => {
    setFormData(data);
    formreceived(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <Flex h={'40%'} w={['100%', '100%','80%','80%', '100%']} justify={'center'} align={'center'} mt={'120px'} mb={20}>
        <Flex flex={1}  flexDir={'column'} textAlign={'center'} justify={'center'} align={'center'}>
          <Text w={"100%"} mb={'30px'}>Valor Parcela Atual</Text>
          <Input
            type="number"
            focusBorderColor="white"
            border={"1px solid #d6d0f5"}
            bg={"#f5f4b2"}
            w={"90%"}
            {...register("parcelaAtual")}
          />
        </Flex>

        <Flex w={'50%'}  align={"center"} flexDir={'column'} textAlign={'center'} justify={'center'}>
          <Text  mb={'30px'} w={"100%"}>Parcela Restante</Text>
          <Input
            type="number"
            focusBorderColor="white"
            border={"1px solid #d6d0f5"}
            bg={"#f5f4b2"}
            w={"90%"}
            {...register("parcelaRestante")}
          />
        </Flex>
      </Flex>

      <Flex gap={4} w={['100%', '100%','80%','80%', '100%']}>
        <Flex flex={1}  align={"center"} flexDir={'column'} textAlign={'center'} justify={'center'} >
          <Text w={"100%"}  mb={'30px'}>Vl Emprestimo</Text>
          <Input
            type="number"
            focusBorderColor="#fff"
            border={"1px solid #d6d0f5"}
            bg={"#f5f4b2"}
           
            {...register("vlEmprestimo")}
          />
        </Flex>
        <Flex flex={1}  align={"center"} textAlign={'center'} flexDir={'column'} justify={'center'} >
          <Text w={"100%"}  mb={'30px'}>Taxa atual</Text>
          <Flex
            borderRadius={"7px"}
            bg={"#a3eff5"}
            h={"40px"}
            align={"center"}
            w={"100%"}
            textAlign={'center'} justify={'center'}
          >
            <Text ml={"10px"}> {taxx}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        mt={10}
        bg={"#3f5ee9"}
        color={"#FFF"}
        _hover={{
          background: "#066986",
        }}
        type="submit"
      >
        Calcular
      </Button>
    </form>
  );
}
