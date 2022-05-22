import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Abastecimento } from '../abastecimento/abastecimento';

const API = 'http://localhost:3000/veiculo';

@Injectable({providedIn: 'root'})
export class AbastecimentoService{

  constructor(){}
  /* constructor(private http: HttpClient){}

  listFromVeiculo(veiculoId: number){

    return this.http
    .get<Abastecimento[]>(`${API}/${veiculoId}/abastecimentos`);

  } */

  abastecimentos: Abastecimento[] = [
    {
      id: 1,
      veiculoId: 1,
      dataAbastecimento: '02/05/2022',
      combustivel: 'Gasolina',
      odometro: 100400,
      litros: 50.15,
      valorLitro: 6.97,
      valorTotal: 350.88,
      kmPorLitro: 8,
      posto: 'Shell'
    },
    {
      id: 2,
      veiculoId: 1,
      dataAbastecimento: '07/05/2022',
      combustivel: 'Gasolina',
      odometro: 100950,
      litros: 68.75,
      valorLitro: 7.19,
      valorTotal: 490.23,
      kmPorLitro: 9.2,
      posto: 'Shell'
    },
    {
      id: 3,
      veiculoId: 2,
      dataAbastecimento: '10/05/2022',
      combustivel: 'Gasolina',
      odometro: 31400,
      litros: 49.32,
      valorLitro: 7.99,
      valorTotal: 400.18,
      kmPorLitro: 10,
      posto: 'Ipiranga'
    }
  ];

  listFromVeiculo(veiculoId: number){
    return this.abastecimentos.filter(v => veiculoId === v.veiculoId);
  }

}
