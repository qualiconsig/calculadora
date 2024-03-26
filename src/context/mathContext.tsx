import { createContext, useContext, useState } from "react";

interface NameProps {
  formdata: {
    parcelaAtual: string,
    parcelaRestante: string,
    vlEmprestimo: string
  };
  

}

interface MathContextProps {
  setName: React.Dispatch<React.SetStateAction<NameProps | undefined>>;
  name?: NameProps
}

const formsendContext = createContext({} as  MathContextProps);

export function MathContext({children}: any) {
  const [name, setName] = useState<NameProps>();
  return <formsendContext.Provider value={{setName,name}}>{children}</formsendContext.Provider>
};

export const useNameContextHook = () => {
  const context = useContext(formsendContext)
  return context;
}