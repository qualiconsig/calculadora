import { Box, Button, Flex, Text } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Resumo () {
  const router = useRouter()
  const valRouter:any = router.query.slug

  const [screentext, setScreenText] = useState<string>()
  const captureRef = useRef<HTMLDivElement>(null);

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
                          }, 2000); // Definindo o temporizador para 2 segundos
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

  const [val, setval] = useState()
  const [val1, setval1] = useState()
  const [val2, setval2] = useState()
  const [val3, setval3] = useState()
  const [val4, setval4] = useState()
  const [val5, setval5] = useState()
  const [val6, setval6] = useState()
  const [val7, setval7] = useState()
  const [val8, setval8] = useState()

  const percorrerRota = () => {
    const per = valRouter?.split('-')
    setval(per[0]);
    setval1(per[1]);
    setval2(per[2]);
    setval3(per[3]);
    setval4(per[4]);
    setval5(per[5]);
    setval6(per[6]);
    setval7(per[7]);
    setval8(per[8]);
  }

  useEffect(()=>{
    percorrerRota()
  },[])

  useEffect(() => {
    if (screentext) {
      const timeout = setTimeout(() => {
        setScreenText('');
      }, 2000); // Definindo o temporizador para 2 segundos
      return () => clearTimeout(timeout); // Limpa o temporizador ao desmontar o componente
    }
  }, [screentext]);

  return (
    <>
    <Flex   bg={'gray.600'} ref={captureRef} flexDir={'column'} >
      <Box margin={'0 auto'} w={'80vw'}>
        <Box bg={'white'} p={2} borderBottomRadius={5}>
          <Text fontSize={'20px'} textAlign={'center'}>Resumo Da Proposta</Text>
          <Text fontWeight={'bold'}>Banco: {val}</Text>
        </Box>
        <Flex gap={5}  h={'100vh'} justifyContent={'space-between'}  align={'center'}>
          <Box borderRadius={'14px'} alignContent={'center'} h={'30%'} w={'35%'} border={'1px solid orange'} p={2}>
            <Text mb={2} textAlign={'center'}  fontSize={'18px'} color={'orange.500'}>Contrato atual</Text>
            <Box textAlign={'center'} color={'white'} lineHeight={2}>
              <Text>Parcela atual: {val2}</Text>
              <Text>Taxa atual contrato: {val4}</Text>
              <Text>Saldo devedor Aproximado: {val3}</Text>
              <Text>Parcelas restantes: {val6}</Text>
            </Box>
          </Box>
          <Box borderRadius={'14px'} alignContent={'center'}  h={'30%'} w={'35%'} border={'1px solid orange'} p={2}>
            <Text mb={2} textAlign={'center'} fontSize={'18px'} color={'orange.500'}>Novo contrato</Text>
            <Box textAlign={'center'} lineHeight={2} color={'white'}>
              <Text>Nova taxa: {val1}</Text>
              <Text>Nova Parcela: {val5}</Text>
              <Text>Saldo devedor Aproximado: {val3}</Text>
              <Text>Parcelas restantes: {val6}</Text>
            </Box>
          </Box>
          <Box borderRadius={'14px'} alignContent={'center'}h={'30%'} w={'35%'} border={'1px solid orange'} p={2}>
            <Text mb={2} textAlign={'center'}  fontSize={'18px'} color={'orange.500'}>Economia cliente</Text>
            <Box textAlign={'center'} lineHeight={2} color={'white'}>
              <Text>Economia Mensal: {val7}</Text>
              <Text>Economia total: {val8}</Text>
            </Box>
          </Box>
         
          {screentext && 
          <Text position={'absolute'} margin={'0 auto'} bg={'blue.600'} bottom={'60%'} p={2} color={'white'} right={'35%'}>{screentext}</Text>
      }
        </Flex>
        <Box position={'absolute'} bottom={'100px'}>
          <Button onClick={handleCaptured}>Capturar tela</Button>
        </Box>
      </Box>
       
    </Flex>
    </>
  )
}
