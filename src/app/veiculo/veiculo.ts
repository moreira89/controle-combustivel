export class Veiculo
{
  id: number;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  anoModelo: number;
  odometro: number;
  litrosTanque: number;
  combustivel: string;
  cambio: string;

  constructor(
    id: number,
    marca: string,
    modelo: string,
    anoFabricacao: number,
    anoModelo: number,
    odometro: number,
    litrosTanque: number,
    combustivel: string,
    cambio: string
  ){
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.anoFabricacao = anoFabricacao;
    this.anoModelo = anoModelo;
    this.odometro = odometro;
    this.litrosTanque = litrosTanque;
    this.combustivel = combustivel;
    this.cambio = cambio;
  }

}
