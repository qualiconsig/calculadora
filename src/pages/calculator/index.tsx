"use client";
import { resultProps } from "@/types";
import {Box,Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { LeftSide } from "@/components/calculadora/LeftSide";
import { InfoSection } from "@/components/rightside/buscas";
import { QualiFooter } from "@/components/LogoQuali/footer";
import { Refin } from "@/components/rightside/refin";
import { calcularPMT, calcularTaxa } from "@/math";
import { form } from "@/types/mod";
import { Taxas } from "@/math";

export default function Calculadora() {

  const [formData, setFormData] = useState<form>();
  const [result, setCalcResult] = useState<resultProps[]>();
  const [loading, setLoading] = useState(false);

  const [pmt, setPMT]= useState<any>()

  const [taxa, setTaxa] = useState<any>()
  const [valorAtualParcela, setValorAtualParcela] = useState<number>()
  const [parcelaRestante, setParcelaRestante] = useState<number>()
  const activeLoading = () => setTimeout(() => setLoading(true), 3000);

  const handleFormData =  (dataform: any)  => {
    setFormData(dataform);
    console.log(dataform)
    if(dataform) {
      
      
    } else {
      return
    }
  } 
  const received = () => {
    if(formData) {
      const parcelaAtual:any =  parseFloat(formData.parcelaAtual)
      setValorAtualParcela(parcelaAtual.toFixed(2))
      const parcelaRestante =  parseInt(formData.parcelaRestante)
      setParcelaRestante(parcelaRestante)
      const saldoDevedor =  parseFloat(formData!.vlEmprestimo)
      const taxaEncontrada =  calcularTaxa(parcelaAtual, parcelaRestante, -saldoDevedor, 1e-6);
      setTaxa(taxaEncontrada)

      const calc = calcularPMT(saldoDevedor, parcelaRestante)
      setPMT(calc)
    }
  }
  useEffect(() => {
    received()
  },[formData])

  const handleCalc = (datacalc: any) => {
    setCalcResult(datacalc)
    console.log(datacalc)
  }

  useEffect(() => {
    activeLoading();
    
    console.log(formData)
  }, []);
  return (
    <>
      {loading === false && <Loading />}
      {loading === true && (
        <Box w={"100vw"}>
          <Box w={"80%"} m="0 auto"></Box>
          <Flex >
            <LeftSide calculated={handleCalc} formreceived={handleFormData} tax={taxa}/>
            <Box flex={2} bg={"#436087"}>
              <Flex
                w={"80%"}
                m={"50px auto"}
                p={5}
                borderRadius={5}
                justifyContent="space-between"
                bg={"#2D2772"}
                color="white"
              >
                <InfoSection
                  title="Economia Mensal do Cliente"
                  icon="R$"  
                  items={pmt?.map((item:any) =>  (valorAtualParcela! - item  ).toFixed(2)                                                                                                                                                                )}
                />
                <InfoSection
                  title="Nova Taxa"
                  items={Taxas?.map((item) => item)}
                  icon="%"
                />
                <InfoSection
                  title="Nova Parcela"
                  items={pmt?.map((item:any) => item)}
                  icon="R$"
                  
                />
                <InfoSection
                  title="Economia Total no Período"
                  items={pmt?.map((item:any) => ((valorAtualParcela! - item  ) * parcelaRestante!).toFixed(2))}
                />
              </Flex>
              <Flex >
                <Refin/>
              </Flex>
             <QualiFooter/>
            </Box>
          
          </Flex>
        </Box>
      )}
    </>
  );
}
