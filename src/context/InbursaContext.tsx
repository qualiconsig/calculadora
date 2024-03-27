import { createContext, useContext, useState } from "react";

export interface NameProps {
  formdata: {
    nameBank: string
    taxas: number[],
    pmt: number[],
    parcelaAtual: number,
    parcelaRestante: number
  };
  

}

interface MathContextProps {
  setInbursaTax: React.Dispatch<React.SetStateAction<NameProps | undefined>>;
  inbursatax?: NameProps
}

interface ResultContextProps {
  setVlcontext: number,
  vl: number
}

const formsendInbursaContext = createContext({} as  MathContextProps);
const mathResultContext = createContext({} as ResultContextProps)

export function MathInbursa({children}: any) {
  const [inbursatax, setInbursaTax] = useState<NameProps>();
  return <formsendInbursaContext.Provider value={{setInbursaTax,inbursatax}}>{children}</formsendInbursaContext.Provider>
};

export const useInbursaContextHook = () => {
  const context = useContext(formsendInbursaContext)
  return context;
}