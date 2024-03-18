// CalculatorForm.jsx
import { resultProps } from "@/types";
import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function CalculatorForm({calculated, formreceived}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [formData, setFormData] = useState();
  const [result, setResult] = useState<resultProps[]>();
  const onSubmit: SubmitHandler<any> = async (data) => {
    setFormData(data);
    try {
      const response = await axios.post("http://127.0.0.1:8080/calculadora", {
        data,
      });
      if (response) {
        setResult(response.data);
        calculated(response.data);
        formreceived(data)
      }
    } catch (e) {
      console.log(e);
    }
  };
 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex align={'center'} mt={20} mb={7}>
        <Text w={"30%"}>Banco</Text>
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
        <Text w={"30%"}>Prazo inicial</Text>
        <Input
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("prazo")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"30%"}>Parcela Atual</Text>
        <Input
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("parcela atual")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"30%"}>Vl Emprestimo</Text>
        <Input
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("vl emprestimo")}
        />
      </Flex>
      <Flex mb={7} align={'center'}>
        <Text w={"30%"}>Parcelas Pagas</Text>
        <Input
          focusBorderColor="white"
          border={"1px solid #d6d0f5"}
          bg={"#edeafd"}
          w={"40%"}
          {...register("parcelaPaga")}
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
