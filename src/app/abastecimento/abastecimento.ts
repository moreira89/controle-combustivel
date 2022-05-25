export interface Abastecimento
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
}
