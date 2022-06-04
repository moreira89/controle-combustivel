export class Abastecimento
{
  id: number;
  veiculoId: number;
  dataAbastecimento: string;
  combustivel: string;
  litros: number;
  odometro: number;
  valorLitro: number;
  valorTotal: number;
  kmPorLitro: number;
  posto: string;

  constructor(
    id: number,
    veiculoId: number,
    dataAbastecimento: string,
    combustivel: string,
    litros: number,
    odometro: number,
    valorLitro: number,
    valorTotal: number,
    posto: string
  ){
    this.id = id;
    this.veiculoId = veiculoId;
    this.dataAbastecimento = dataAbastecimento;
    this.combustivel = combustivel;
    this.litros = litros;
    this.odometro = odometro;
    this.valorLitro = valorLitro;
    this.valorTotal = valorTotal;
    this.posto = posto;
  }

}
