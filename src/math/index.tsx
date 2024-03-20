import { useEffect } from "react";

export const Taxas = [1.72, 1.70, 1.66, 1.60, 1.56]



export function calcularPMT(valorPresente:number, numeroParcelas:number ) {
  let result:any = []
  Taxas.forEach(taxa => {
    const tx = taxa / 100;
    let total = (valorPresente * tx) / (1 - Math.pow(1 + tx, -numeroParcelas))
    
    result.push(total.toFixed(2))
  });
  return result
 
}





export function calcularTaxa(
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
    throw new Error("Não é possível determinar a taxa com os valores fornecidos");
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
