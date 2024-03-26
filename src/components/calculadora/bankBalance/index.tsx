
import { BoxForm } from "@/components/utils/formBox";
import { useNameContextHook } from "@/context/formContext";
import { resultProps } from "@/types";
import { form } from "@/types/mod";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export function CalculateRealBalance({ calculated, formreceived, taxx }: any) {
  const {setName, name} = useNameContextHook()
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
     

      <Flex w={['100%', '100%','80%','80%', '100%']}>
          <BoxForm text={'Prazo inicial'}>
          <Input
            type="number"
            focusBorderColor="white"
            border={"1px solid #d6d0f5"}
            bg={"#f5f4b2"}
            w={"95%"}
            {...register("PrazoInicial")}
          />
          </BoxForm>
       
        <BoxForm text={"Parcela atual"}>
          <Input
            type="number"
            focusBorderColor="white"
            border={"1px solid #d6d0f5"}
            bg={"#f5f4b2"}
            w={"95%"}
            {...register("parcelaAtual")}
          />
        
        </BoxForm>
      </Flex>

      <Flex w={['100%', '100%','80%','80%', '100%']}>
       <BoxForm text={'Vl. de emprestimo contratado'}>
       <Input
        type="number"
        focusBorderColor="#fff"
        border={"1px solid #d6d0f5"}
        bg={"#f5f4b2"}
        w={"95%"}
        {...register("valorEmprestimoContrado")}
    />
       </BoxForm>
       
        <Flex mb={7} align={"center"} flexDir={'column'}>
          <BoxForm text={'Parcelas pagas'}>
            <Input
              type="number"
              focusBorderColor="#fff"
              border={"1px solid #d6d0f5"}
              bg={"#f5f4b2"}
              w={"95%"}
              {...register("parcelaPaga")}
            />
          </BoxForm>
  
        </Flex>
      </Flex>

      <Flex mb={7} align={"center"}>
        <Text w={"35%"}>Taxa atual</Text>
        <Flex
          borderRadius={"7px"}
          bg={"#a3eff5"}
          h={"40px"}
          align={"center"}
          w={"40%"}
        >
          <Text ml={"10px"}></Text>
        </Flex>
      </Flex>

      <Flex mb={7} align={"center"}>
        <Text w={"35%"}>Taxa atual do contrato</Text>
        <Flex
          borderRadius={"7px"}
          bg={"#a3eff5"}
          h={"40px"}
          align={"center"}
          w={"40%"}
        >
          <Text ml={"10px"}></Text>
        </Flex>
      </Flex>

      <Flex mb={7} align={"center"}>
        <Text w={"35%"}>Saldo devedor aproximado</Text>
        <Flex
          borderRadius={"7px"}
          bg={"#a3eff5"}
          h={"40px"}
          align={"center"}
          w={"40%"}
        >
          <Text ml={"10px"}></Text>
        </Flex>
      </Flex>
    
      <Button
        
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
