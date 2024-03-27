import { createContext, useContext, useState } from "react";

export interface NameProps {
  formdata: {
    nameBank: string
    taxas: number[],
    pagbankpmt: number[],
    parcelaAtual: number,
    parcelaRestante: number
  };
  

}

interface MathContextProps {
  setName: React.Dispatch<React.SetStateAction<NameProps | undefined>>;
  name?: NameProps
}

interface ResultContextProps {
  setVlcontext: number,
  vl: number
}

const formsendContext = createContext({} as  MathContextProps);
const mathResultContext = createContext({} as ResultContextProps)

export function MathContext({children}: any) {
  const [name, setName] = useState<NameProps>();
  return <formsendContext.Provider value={{setName,name}}>{children}</formsendContext.Provider>
};

export const useNameContextHook = () => {
  const context = useContext(formsendContext)
  return context;
}