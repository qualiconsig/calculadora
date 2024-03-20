// CalculatorForm.jsx
import { CalcMath, Calcu, CalcularTaxaAtual, calcularPMT, calcularTaxa, taxa } from "@/math";
import { resultProps } from "@/types";
import { form } from "@/types/mod";
import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function CalculatorForm({calculated, formreceived}: any) {
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
 
 useEffect(()=> {
   
    
  
 },[])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex align={'center'} mt={20} mb={7}>
        <Text w={"38%"}>Banco</Text>
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
        </Select>
      </Flex>
      <Flex mb={7}  align={'center'}>
        <Text w={"35%"}>Valor Parcela Atual</Text>
        <Input
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("parcelaAtual")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"35%"}>Parcela Restante</Text>
        <Input
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("parcelaRestante")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"35%"}>Vl Emprestimo</Text>
        <Input
          focusBorderColor="#fff"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("vlEmprestimo")}
        />
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
