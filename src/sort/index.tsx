import { useC6ContextHook } from "@/context/C6Context"
import { useInbursaContextHook } from "@/context/InbursaContext";
import { useNameContextHook } from "@/context/pagbankContext";

export const sortTaxas = () => {
  const {name, setName} = useNameContextHook();
  const {inbursatax ,setInbursaTax } = useInbursaContextHook()
  const {c6tax , setC6Tax} = useC6ContextHook()

  const pagbank = name?.formdata
  const inbursa = inbursatax?.formdata
  const c6 = c6tax?.formdata

  const allbank = {
    pagbank,
    inbursa,
    c6
  }

 console.log(allbank)

  
}