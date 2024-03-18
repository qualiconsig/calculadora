"use client";
import { resultProps } from "@/types";
import {Box,Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { LeftSide } from "@/components/calculadora/LeftSide";
import { InfoSection } from "@/components/rightside/buscas";
import { QualiFooter } from "@/components/LogoQuali/footer";

export default function Calculadora() {

  const [formData, setFormData] = useState();
  const [result, setCalcResult] = useState<resultProps[]>();
  const [loading, setLoading] = useState(false);

  const activeLoading = () => setTimeout(() => setLoading(true), 3000);
  const handleFormData = (dataform: any) => setFormData(dataform);
  const handleCalc = (datacalc: any) => setCalcResult(datacalc)

  useEffect(() => {
    activeLoading();
  }, []);
  return (
    <>
      {loading === false && <Loading />}
      {loading === true && (
        <Box w={"100vw"}>
          <Box w={"80%"} m="0 auto"></Box>
          <Flex>
            <LeftSide calculated={handleCalc} formreceived={handleFormData} />
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
                  items={result?.map((item) => item.economiaMensalCliente)}
                />
                <InfoSection
                  title="Nova Taxa"
                  items={result?.map((item) => item.novataxa)}
                />
                <InfoSection
                  title="Nova Parcela"
                  items={result?.map((item) => item.novaParcela)}
                />
                <InfoSection
                  title="Economia Total no Período"
                  items={result?.map((item) => item.economiaTotalPeriodo)}
                />
              </Flex>
             <QualiFooter/>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}
