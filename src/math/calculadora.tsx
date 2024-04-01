export class CalculadoraGeral {
  taxas
  constructor(taxas:any) {
    this.taxas = taxas;
  }

  calcularPMT(valorPresente:any, numeroParcelas:any) {
    const result:any = [];
    this.taxas.forEach((taxa: number) => {
      const tx = taxa / 100;
      let total = (valorPresente * tx) / (1 - Math.pow(1 + tx, -numeroParcelas));

      const pmtResult =  parseFloat(total.toFixed(2));
      const totalReplaced = pmtResult.toString().replace(".", ",");
      result.push(pmtResult);
    });
    return result;
  }

  calcularTaxa(pagamento:number, numeroDePeriodos:number, valorPresente:number, precisao = 1e-9) {
    let taxaMin = 0.0;
    let taxaMax = 1.0;

    function valorPresenteComTaxa(taxa: number) {
      if (taxa === 0) {
        return valorPresente + pagamento * numeroDePeriodos;
      } else {
        return (
          valorPresente +
          (pagamento * (1 - Math.pow(1 + taxa, -numeroDePeriodos))) / taxa
        );
      }
    }

    if (valorPresenteComTaxa(taxaMin) * valorPresenteComTaxa(taxaMax) >= 0) {
      return 0;
    }

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
    const taxaAtual = taxaMin * 100;
    const numCort = taxaAtual.toFixed(2);

    return parseFloat(numCort);
  }
  calcularValorPresenteComParcelasPagas(valorPresente: number, numeroParcelas: number, parcelasPagas: number) {
    return valorPresente * Math.pow(1 + (this.taxas[0] / 100), parcelasPagas) - (this.calcularPMT(valorPresente, numeroParcelas)[0] * ((Math.pow(1 + (this.taxas[0] / 100), parcelasPagas) - 1) / (this.taxas[0] / 100)));
  }
}


