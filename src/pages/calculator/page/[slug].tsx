import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Resumo() {
  const router = useRouter();
  const valRouter:any = router.query.slug;

  const [screentext, setScreenText] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCaptured = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        if (canvas) {
          canvas.toBlob((blob) => {
            if (blob) {
              const item = new ClipboardItem({ 'image/png': blob });
              navigator.clipboard.write([item]).then(() => {
                setScreenText("Captura de tela copiada para a área de transferência!");
                setTimeout(() => {
                  setScreenText("");
                }, 2000);
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

  const [val, setVal] = useState<any>("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [val5, setVal5] = useState("");
  const [val6, setVal6] = useState("");
  const [val7, setVal7] = useState("");
  const [val8, setVal8] = useState("");

  const percorrerRota = () => {
    const per:any = valRouter?.split("-");
    if (per) {
      setVal(per[0]);
      setVal1(per[1]);
      setVal2(per[2]);
      setVal3(per[3]);
      setVal4(per[4]);
      setVal5(per[5]);
      setVal6(per[6]);
      setVal7(per[7]);
      setVal8(per[8]);
    }
  };

  useEffect(() => {
    percorrerRota();
  }, []);

  useEffect(() => {
    if (screentext) {
      const timeout = setTimeout(() => {
        setScreenText("");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [screentext]);

  return (
    <Flex direction="column" minHeight="100vh" bg="#2C3E50" ref={captureRef}>
      <Flex align="center" bg="#E74C3C" p={4}>
        <Box as={FaArrowLeft} color="white" />
        <Link href="/calculator" >
          <Text ml={2} color="white">Voltar</Text>
        </Link>
      </Flex>

      <Box mx="auto" maxW="80vw" flex="1">
        <Box bg="white" p={4} borderRadius="md" mb={4}>
          <Text fontSize="xl" textAlign="center" fontWeight="bold">Resumo da Proposta</Text>
          <Text fontWeight="bold">Banco: {val}</Text>
        </Box>

        <Flex justify="space-between" alignItems="stretch" flexWrap="wrap" gap={2}>
          <Box flex="1" minW="250px" bg="#ECF0F1" p={4} borderRadius="md" mb={4}>
            <Text mb={2} fontSize="xl" textAlign="center" color="orange.500">Contrato Atual</Text>
            <Box color="black">
              <Text>Parcela Atual: {val2}</Text>
              <Text>Taxa Atual do Contrato: {val4}</Text>
              <Text>Saldo Devedor Aproximado: {val3}</Text>
              <Text>Parcelas Restantes: {val6}</Text>
            </Box>
          </Box>

          <Box flex="1" minW="250px" bg="#ECF0F1" p={4} borderRadius="md" mb={4}>
            <Text mb={2} fontSize="xl" textAlign="center" color="orange.500">Novo Contrato</Text>
            <Box color="black">
              <Text>Nova Taxa: {val1}</Text>
              <Text>Nova Parcela: {val5}</Text>
              <Text>Saldo Devedor Aproximado: {val3}</Text>
              <Text>Parcelas Restantes: {val6}</Text>
            </Box>
          </Box>

          <Box flex="1" minW="250px" bg="#ECF0F1"  p={4} borderRadius="md" mb={4}>
            <Text mb={2} fontSize="xl" textAlign="center" color="orange.500">Economia Cliente</Text>
            <Box color="black">
              <Text>Economia Mensal: {val7}</Text>
              <Text>Economia Total: {val8}</Text>
            </Box>
          </Box>
        </Flex>

        {screentext && (
          <Text bg="pink.600" color="white" p={2} borderRadius="md" textAlign="center" mt={4}>{screentext}</Text>
        )}

        <Box textAlign="center" mt={4}>
          <Button onClick={handleCaptured}>Capturar Tela</Button>
        </Box>
      </Box>
    </Flex>
  );
}
