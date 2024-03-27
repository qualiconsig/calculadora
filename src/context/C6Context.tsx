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
  setC6Tax: React.Dispatch<React.SetStateAction<NameProps | undefined>>;
  c6tax?: NameProps
}

interface ResultContextProps {
  setVlcontext: number,
  vl: number
}

const formsendC6Context = createContext({} as  MathContextProps);
const mathResultContext = createContext({} as ResultContextProps)

export function MathC6({children}: any) {
  const [c6tax, setC6Tax] = useState<NameProps>();
  return <formsendC6Context.Provider value={{setC6Tax,c6tax}}>{children}</formsendC6Context.Provider>
};

export const useC6ContextHook = () => {
  const context = useContext(formsendC6Context)
  return context;
}