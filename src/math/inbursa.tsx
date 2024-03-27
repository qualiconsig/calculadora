
import { useNameContextHook } from "@/context/formContext";
import { useContext, useEffect } from "react";

export const TaxasInbursa = [ 1.45, 1.54, 1.58 , 1.68 ,1.78]



export function calcularPMTInbursa(valorPresente:number, numeroParcelas:number ) {


  let result:any = []
  TaxasInbursa.forEach(taxa => {
    const tx = taxa / 100;
    let total = (valorPresente * tx) / (1 - Math.pow(1 + tx, -numeroParcelas))


    const pmtResult = (total.toFixed(2))
    const totalReplaced = pmtResult.toString().replace(".",",")
    result.push((parseFloat(totalReplaced)))
  });
  console.log(result)
  return result
 
}

export function calcularTaxaInbursa(
  pagamento: number,
  numeroDePeriodos: number,
  valorPresente: number,
  precisao: number = 1e-9
): number {
  let taxaMin = 0.0;
  let taxaMax = 1.0;

  // Função que calcula o valor presente com base na taxa de juros
  function valorPresenteComTaxa(taxa: number): number {
    if (taxa === 0) {
      return valorPresente + pagamento * numeroDePeriodos;
    } else {
      return valorPresente + pagamento * (1 - Math.pow(1 + taxa, -numeroDePeriodos)) / taxa;
    }
  }

  // Verifica se o valor presente com taxa min e taxa max têm sinais opostos
  if (valorPresenteComTaxa(taxaMin) * valorPresenteComTaxa(taxaMax) >= 0) {
    return (0)
  }

  // Loop para encontrar a taxa com a precisão especificada
  while (taxaMax - taxaMin >= precisao) {
    const taxaMeio = (taxaMin + taxaMax) / 2;
    const vpMeio = valorPresenteComTaxa(taxaMeio);

    if (vpMeio === 0) {
      break;
    } else if (vpMeio * valorPresenteComTaxa(taxaMin) < 0) {
      taxaMax = taxaMeio;
    } else {
      taxaMin = taxaMeio;
    }
  }
  const taxaAtual = taxaMin * 100
  const numCort = taxaAtual.toFixed(2)

  return parseFloat(numCort)
}
