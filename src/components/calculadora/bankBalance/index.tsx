// CalculatorForm.jsx

import { resultProps } from "@/types";
import { form } from "@/types/mod";
import {  Button, Flex, Input, Select, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function CalculateRealBalance({calculated, formreceived, taxx}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState<form>();
  const [result, setResult] = useState<resultProps[]>();
  const onSubmit: SubmitHandler<any> = async (data) => {
      setFormData(data);
      formreceived(data)
    } 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex align={'center'} mt={'10px'} mb={7}>

        {/* <Text w={"38%"}>Banco</Text>
        <Select
          placeholder="Selecione um banco"
          color={"#485252"}
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"70%"}
          {...register("selectedBank")}
        >
          <option>C6</option>
          <option>Inbursa</option>
          <option>PagBank</option>
          <option>calculadora do cidadao(bacen)</option>
          <option>Todos</option>
        </Select> */}
      </Flex>
      <Flex mb={7}  align={'center'}>
        <Text w={"35%"}>Prazo inicial</Text>
        <Input
          type="number"
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("PrazoInicial")}
        />
      </Flex>
      
     
      <Flex mb={7} align={'center'}>
        <Text w={"35%"}>Parcela Atual</Text>
        <Input
        type="number"
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("parcelaAtual")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"35%"}>Valor de emprestimo contratado</Text>
        <Input
         type="number"
          focusBorderColor="#fff"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("valorEmprestimoContrado")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"35%"}>Parcelas pagas</Text>
        <Input
         type="number"
          focusBorderColor="#fff"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("parcelaPaga")}
        />
      </Flex>

      <Flex mb={7}  align={'center'}>
        <Text w={"35%"}>Taxa atual</Text>
        <Flex  borderRadius={'7px'} bg={"#dce493"} h={'40px'} align={'center'} w={'40%'}>
          <Text ml={'10px'}> {taxx}</Text>
        </Flex>
       
      </Flex>

      <Flex mb={7}  align={'center'}>
        <Text w={"35%"}>Taxa atual do contrato</Text>
        <Flex  borderRadius={'7px'} bg={"#dce493"} h={'40px'} align={'center'} w={'40%'}>
          <Text ml={'10px'}> {taxx}</Text>
        </Flex>
       
      </Flex>

      <Flex mb={7}  align={'center'}>
        <Text w={"35%"}>Saldo devedor aproximado</Text>
        <Flex  borderRadius={'7px'} bg={"#dce493"} h={'40px'} align={'center'} w={'40%'}>
          <Text ml={'10px'}> {taxx}</Text>
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
