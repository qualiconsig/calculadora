"use client";
import { resultProps } from "@/types";
import {Box,Button,Flex} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/loading";
import { LeftSide } from "@/components/calculadora/LeftSide";
import { InfoSection, InfoVal } from "@/components/rightside/buscas";
import { QualiFooter } from "@/components/LogoQuali/footer";
import { Refin } from "@/components/rightside/refin";
import { calcularPMT, calcularTaxa } from "@/math";
import { form } from "@/types/mod";
import { Taxas } from "@/math";

import { ScreenCapture } from 'react-screen-capture';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver'

export default function Calculadora() {

  const captureRef = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (captureRef.current) {
        html2canvas(captureRef.current).then(canvas => {
            if (canvas) {
                canvas.toBlob(blob => {
                    if (blob) {
                        saveAs(blob, "screenshot.png");
                    } else {
                        console.error("Erro ao criar o blob da captura.");
                    }
                });
            } else {
                console.error("Erro ao criar o canvas da captura.");
            }
        });
    } else {
        console.error("Elemento de captura não encontrado.");
    }
};
  
  const [formData, setFormData] = useState<form>();
  const [result, setCalcResult] = useState<resultProps[]>();
  const [loading, setLoading] = useState(false);

  const [pmt, setPMT]= useState<any>()

  const [taxa, setTaxa] = useState<any>()
  const [valorAtualParcela, setValorAtualParcela] = useState<number>()
  const [parcelaRestante, setParcelaRestante] = useState<number>()
  const activeLoading = () => setTimeout(() => setLoading(true), 3000);
  const [saldoDev, setSaldoDev] = useState()

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
      const saldoDevedor:any =  parseFloat(formData!.vlEmprestimo)
      setSaldoDev(saldoDevedor)
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
        <>
        
        
        <Box w={"100vw"} >
       
          <Box w={"80%"} m="0 auto"></Box>
          <Flex >
            
            <LeftSide calculated={handleCalc} formreceived={handleFormData} tax={taxa}/>
            <Box position={'absolute'}  bottom={'50px'}><Button bg={'blue.600'} onClick={handleCapture}>Capturar tela</Button></Box>
            <Box flex={2} bg={"#436087"} ref={captureRef}>
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
                <InfoVal
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
                  icon="R$"
                />
              </Flex>
              <Flex >
                <Refin saldo={saldoDev} parcelaAtual={valorAtualParcela}/>
              </Flex>
             <QualiFooter/>
            </Box>
          
          </Flex>
        </Box>
        </>
      )}
    </>
  );
}

