import { AbastecimentoStorage } from './abastecimento.storage';

import { Abastecimento } from './abastecimento';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

const API = 'http://localhost:3000/veiculo';

@Injectable({providedIn: "root"})
export class AbastecimentoService
{
  abastecimento:Abastecimento;

  abastecimentos: Abastecimento[] = [];

  constructor(public abastecimentoStorage: AbastecimentoStorage){
  }
  /* constructor(private http: HttpClient){}

  listFromVeiculo(veiculoId: number){

    return this.http
    .get<Abastecimento[]>(`${API}/${veiculoId}/abastecimentos`);

  } */

  cadastrarAbastecimento(abastecimento: Abastecimento){
    console.log("AbastecimentoService cadastrarAbastecimento");
    this.abastecimentoStorage.cadastrarAbastecimento(abastecimento);
  }

  selecionarTodos(veiculoId: number){
    this.abastecimentos = this.abastecimentoStorage.selecionarTodosAbastecimentos(veiculoId);
    return this.abastecimentos;
  }

  selecionarAbastecimento(idVeiculo: number, idAbastecimento:number){
    this.abastecimento = this.abastecimentoStorage.selecionarAbastecimento(idVeiculo, idAbastecimento);
    return this.abastecimento;
  }

  deletarAbastecimento(veiculoId: number, id: number){
    this.abastecimentoStorage.deletarAbastecimento(veiculoId, id);
  }

}
