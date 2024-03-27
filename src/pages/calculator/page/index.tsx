"use client";
import { resultProps } from "@/types";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Loading from "@/components/loading";
import { LeftSide } from "@/components/calculadora/LeftSide";
import { form } from "@/types/mod";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Butto } from "@/components/utils/linkButton/linkBut";
import { Port } from "@/components/refin-port/refin";
import { useNameContextHook } from "@/context/formContext";
import { useInbursaContextHook } from "@/context/guardResfrommath";
import { CalculadoraGeral } from "@/math/calculadora";

export default function Calculadora() {
  const [screentext, setScreenText] = useState<string>();
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        if (canvas) {
          canvas.toBlob((blob) => {
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
      html2canvas(captureRef.current).then((canvas) => {
        if (canvas) {
          canvas.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ "image/png": blob });
              navigator.clipboard
                .write([item])
                .then(() => {
                  setScreenText(
                    "Captura de tela copiada para a área de transferência!"
                  );
                  setTimeout(() => {
                    setScreenText("");
                  }, 3000);
                })
                .catch((err) => {
                  console.error(
                    "Erro ao copiar a captura de tela para a área de transferência:",
                    err
                  );
                });
            } else {
              console.error("Erro ao criar o blob da captura.");
            }
          }, "image/png");
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

  const [pmt, setPMT] = useState<any>();

  const [taxa, setTaxa] = useState<any>();
  const [valorAtualParcela, setValorAtualParcela] = useState<number>();
  const [parcelaRestante, setParcelaRestante] = useState<number>();
  const activeLoading = () => setTimeout(() => setLoading(true), 3000);
  const [saldoDev, setSaldoDev] = useState();

  const { setName, name } = useNameContextHook();

  const [option, setOption] = useState("Portabilidade");

  const handleFormData = (dataform: any) => {
    setFormData(dataform);
    console.log(dataform);
    if (dataform) {
    } else {
      return;
    }
  };
  const { inbursatax, setInbursaTax } = useInbursaContextHook();
  const received = () => {
    if (formData) {
      const parcelaAtual: any = parseFloat(formData.parcelaAtual);
      setValorAtualParcela(parcelaAtual.toFixed(2));
      const parcelaRestante = parseFloat(formData.parcelaRestante);
      setParcelaRestante(parcelaRestante);

      const saldoDevedor: any = formData!.vlEmprestimo;
      setSaldoDev(saldoDevedor);

      const CalculadoraInbursa = () => {
        const taxa = [ 1.45, 1.54, 1.58 , 1.68 ,1.78]
        const InbursaCalc = new CalculadoraGeral(taxa)
        const TaxaCalc = InbursaCalc.calcularTaxa(
          parcelaAtual,
          parcelaRestante,
          -saldoDevedor,
          1e-6
        )
        const PmtCalc = InbursaCalc.calcularPMT(
          saldoDevedor,
          parcelaRestante
        )
        
        const objInbursaPmt = {
          nameBank: 'Inbursa',
          taxa,
          PmtCalc,
          parcelaAtual,
          parcelaRestante,
        };
        setInbursaTax({ formdata: objInbursaPmt });
        
      };
      console.log('inbursa', inbursatax)
      
      const CalculadoraPagBank = () => {
        const taxas = [1.72, 1.70, 1.66, 1.60, 1.56]
        const pagbankCalc = new CalculadoraGeral(taxas)
        const taxaPagbank = pagbankCalc.calcularTaxa(
          parcelaAtual,
          parcelaRestante,
          -saldoDevedor,
          1e-6
        );
        const pagbankpmt = pagbankCalc.calcularPMT(saldoDevedor, parcelaRestante)
        setTaxa(taxaPagbank);
        setPMT(pagbankpmt);

        const objPagBank = {
          nameBank: 'Pagbank',
          taxas,
          pagbankpmt,
          parcelaAtual,
          parcelaRestante,
        };
        
        console.log('pagbank', objPagBank);
      };

      const CalculadoraC = () => {
        const taxas = [1.55, 1.60, 1.65, 1.70, 1.75, 1.60, 1.65, 1.70, 1.75, 1.76]
        const c6calc = new CalculadoraGeral(taxas)
        const taxaCalc = c6calc.calcularTaxa( parcelaAtual,
          parcelaRestante,
          -saldoDevedor,
          1e-6)
        const ptm = c6calc.calcularPMT(saldoDevedor, parcelaRestante)
        console.log(taxaCalc, ptm)

      }

      CalculadoraC()
      CalculadoraPagBank()
      CalculadoraInbursa()

    }
  };
  useEffect(() => {
    received();
  }, [formData]);

  const handleCalc = (datacalc: any) => {
    setCalcResult(datacalc);
    console.log(datacalc);
  };

  const [portabilidade, setPortabilidade] = useState(false);
  const [refin, setrefin] = useState(false);

  const selectRefinanciamento = () => {
    if (portabilidade === true) {
      setPortabilidade(false);
    }
    if (refin == true) {
      setrefin(false);
      return;
    }
    setrefin(true);
  };
  const selectPortabilidade = () => {
    if (refin == true) {
      setrefin(false);
    }
    if (portabilidade == true) {
      setPortabilidade(false);
      return;
    }
    setPortabilidade(true);
  };

  useEffect(() => {
    activeLoading();

    console.log(formData);
  }, []);
  return (
    <>
      {loading === false && <Loading />}
      {loading === true && (
        <>
          <Box w={["100vw", "100vw", "100vw", "100vw", "98.8vw"]}>
            <Box w={["100%", "80%"]} m="0 auto"></Box>
            <Flex flexDir={["column", "column", "row"]}>
              <Flex flexDir={"column"}>
                <LeftSide
                  calculated={handleCalc}
                  formreceived={handleFormData}
                  tax={taxa}
                />
              </Flex>
              <Flex
                flex={2}
                bg={"#4f64aa"}
                align={"center"}
                flexDir={["column", "row"]}
                justify={"center"}
              >
                <Box w={["100%", "95%", "95%", "95%", "80%"]}>
                  <Flex mt={2} ml={2} gap={2} justify={"center"} mb={10}>
                    <div onClick={selectPortabilidade}>
                      <Butto text="Portabilidade" />
                    </div>
                    <div onClick={selectRefinanciamento}>
                      <Butto text="Refinanciamento" />
                    </div>
                  </Flex>
                  <Flex justify={"center"} margin={"0 auto"}>
                    <Flex
                      gap={"20px"}
                      fontSize={"16px"}
                      fontWeight={"700"}
                      p={2}
                      borderRadius={2}
                      bg={"#636792"}
                    >
                      <Text color={"#4c1999"}>Inbursa</Text>
                      <Text color={"#50d61f"}>PagBank</Text>
                      <Text color={"#0e0f1b"}>C6</Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    {refin === true && (
                      <Text color={"white"}>Refinanciamento</Text>
                    )}
                    {portabilidade == true && (
                      <Box color={"white"} w={["100%", "100%"]}>
                        <Text color={"white"}>Portabilidade</Text>
                        <Port color={"#1c308b"} />
                      </Box>
                    )}
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
}
