import { HttpClient } from '@angular/common/http';
import { AbastecimentoStorage } from './abastecimento.storage';

import { Abastecimento } from './abastecimento';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000/abastecimentos';

@Injectable({providedIn: "root"})
export class AbastecimentoService
{
  abastecimento:Abastecimento;

  abastecimentos: Abastecimento[] = [];

  constructor(public abastecimentoStorage: AbastecimentoStorage,
              private http: HttpClient){}

  cadastrarAbastecimento(abastecimento: Abastecimento){
    console.log("AbastecimentoService cadastrarAbastecimento");
    this.abastecimentoStorage.cadastrarAbastecimento(abastecimento);
  }

  selecionarTodos(veiculoId: number){
  //this.abastecimentos = this.abastecimentoStorage.selecionarTodosAbastecimentos(veiculoId);
  this.abastecimentos = this.promiseSelecionarTodosAbastecimentos(veiculoId);
    return this.abastecimentos;
  }

  promiseSelecionarTodosAbastecimentos(veiculoId: number){
    console.log("AbastecimentoService promiseSelecionarTodosAbastecimentos");

    this.abastecimentos = [];

    new Promise<Abastecimento[]>((resolve, reject) => {

      this.http.get<Abastecimento[]>(`${API}?veiculoId=${veiculoId}`).subscribe({
        next: (res:any)=>{
                      this.abastecimentos = res.map((res:Abastecimento) => {
                            const v:Abastecimento = new Abastecimento(res.id, res.veiculoId, res.dataAbastecimento, res.combustivel, res.litros, res.odometro, res.valorLitro, res.valorTotal, res.posto);
                            this.abastecimentos.push(v);
                       });
                       resolve(this.abastecimentos);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });

    console.log(this.abastecimentos);
    console.log("AbastecimentoService.promiseSelecionarTodosAbastecimentos foi finalizada.");

    return this.abastecimentos;
  }

  selecionarAbastecimento(idVeiculo: number, idAbastecimento:number){
    this.abastecimento = this.abastecimentoStorage.selecionarAbastecimento(idVeiculo, idAbastecimento);
    return this.abastecimento;
  }

  deletarAbastecimento(veiculoId: number, id: number){
    this.abastecimentoStorage.deletarAbastecimento(veiculoId, id);
  }

  promiseDeletarAbastecimento(id: number){
    console.log("AbastecimentoService.promiseDeletarAbastecimento está sendo executado.");
    console.log(`${API}/${id}`);

    new Promise<void>((resolve, reject) => {

      this.http.delete(`${API}/${id}`).subscribe({
        error: (err:any) =>{
          reject(console.log(err));
        },
        next: () =>{
          resolve();
        }
      });
    });
    console.log("AbastecimentoService.promiseDeletarAbastecimento foi finalizada.");
  }

}
