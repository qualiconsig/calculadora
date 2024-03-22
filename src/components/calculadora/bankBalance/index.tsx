// CalculatorForm.jsx

import { BoxForm } from "@/components/utils/formBox";
import { resultProps } from "@/types";
import { form } from "@/types/mod";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function CalculateRealBalance({ calculated, formreceived, taxx }: any) {
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
      <Flex align={"center"} mt={"10px"} mb={7}></Flex>
      <Flex>

       
          <BoxForm text={'Prazo inicial'}>
          <Input
            type="number"
            focusBorderColor="white"
            border={"1px solid #d6d0f5"}
            bg={"#edeafd"}
            w={"80%"}
            {...register("PrazoInicial")}
          />
          </BoxForm>
       
        <BoxForm text={"Parcela atual"}>
        
          <Input
            type="number"
            focusBorderColor="white"
            border={"1px solid #d6d0f5"}
            bg={"#edeafd"}
            w={"80%"}
            {...register("parcelaAtual")}
          />
        
        </BoxForm>
      </Flex>

      <Flex>
       <BoxForm text={'Valor de emprestimo contratado'}>
       <Input
        type="number"
        focusBorderColor="#fff"
        border={"1px solid #d6d0f5"}
        bg={"#edeafd"}
        w={"80%"}
        {...register("valorEmprestimoContrado")}
    />
       </BoxForm>
       
        <Flex mb={7} align={"center"} flexDir={'column'}>
          <BoxForm text={'Parcelas pagas'}>
            <Input
              type="number"
              focusBorderColor="#fff"
              border={"1px solid #d6d0f5"}
              bg={"#edeafd"}
              w={"80%"}
              {...register("parcelaPaga")}
            />
          </BoxForm>
  
        </Flex>
      </Flex>

      <Flex mb={7} align={"center"}>
        <Text w={"35%"}>Taxa atual</Text>
        <Flex
          borderRadius={"7px"}
          bg={"#dce493"}
          h={"40px"}
          align={"center"}
          w={"40%"}
        >
          <Text ml={"10px"}> {taxx}</Text>
        </Flex>
      </Flex>

      <Flex mb={7} align={"center"}>
        <Text w={"35%"}>Taxa atual do contrato</Text>
        <Flex
          borderRadius={"7px"}
          bg={"#dce493"}
          h={"40px"}
          align={"center"}
          w={"40%"}
        >
          <Text ml={"10px"}> {taxx}</Text>
        </Flex>
      </Flex>

      <Flex mb={7} align={"center"}>
        <Text w={"35%"}>Saldo devedor aproximado</Text>
        <Flex
          borderRadius={"7px"}
          bg={"#dce493"}
          h={"40px"}
          align={"center"}
          w={"40%"}
        >
          <Text ml={"10px"}> {taxx}</Text>
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
