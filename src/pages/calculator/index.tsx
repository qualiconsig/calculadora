"use client";
import { resultProps } from "@/types";
import {Box,Button,Flex, Text} from "@chakra-ui/react";
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
  const [screentext, setScreenText] = useState<string>()
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

const handleCaptured = () => {
  if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
          if (canvas) {
              canvas.toBlob(blob => {
                  if (blob) {
                      const item = new ClipboardItem({ 'image/png': blob });
                      navigator.clipboard.write([item]).then(() => {
                        setScreenText("Captura de tela copiada para a área de transferência!");
                        setTimeout(() => {
                          setScreenText('');
                        }, 3000);
                      }).catch(err => {
                          console.error("Erro ao copiar a captura de tela para a área de transferência:", err);
                      });
                  } else {
                      console.error("Erro ao criar o blob da captura.");
                  }
              }, 'image/png');
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

        <Box  w={"100vw"}  >
       
          <Box  w={["100%", "80%"]}  m="0 auto"></Box>
          <Flex flexDir={['column','column', 'row']} >
            <Flex flexDir={'column'} w={'30%'}  >
            <LeftSide calculated={handleCalc} formreceived={handleFormData} tax={taxa}/>
            
            </Flex>
            <Box flex={2} bg={"#436087"} ref={captureRef}>
               <Flex
                w={["100%", "95%", "95%", '95%',  '80%']}
                m={"50px auto"}
                p={5}
                gap={['5px', '4px', '3px', '4px', '3px']}
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
                <Box position={'absolute'} right={'20px'} bottom={['21%', '24%', '50%', '50%', '56%']}><Button alignItems={'center'} bg={'transparent'} onClick={handleCaptured}>Capturar tela</Button>
                  { screentext &&
                    <Text transform={'all ease 0.2'} bg={'yellow.500'} borderRadius={4} p={2} color={'black'}>{screentext}</Text>}
                </Box>
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
                <Refin saldo={saldoDev} parcelaAtual={valorAtualParcela} parcelaRest={parcelaRestante} />
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

