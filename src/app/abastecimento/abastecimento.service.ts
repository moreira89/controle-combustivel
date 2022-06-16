import { Observable } from 'rxjs';
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

  insereAbastecimento(veiculo: Abastecimento){

    console.log("AbastecimentoService.insereAbastecimento está sendo executado.");

    new Promise<void>((resolve, reject) => {

      this.http.post(API, veiculo).subscribe({
                    error: (err:any) =>{
                      reject(console.log(err));
                    },
                    next: () =>{
                      resolve();
                    }
                  });
    });

  console.log("AbastecimentoService.insereAbastecimento foi finalizada.");
}

  cadastrarAbastecimento(abastecimento: Abastecimento){

    console.log("AbastecimentoService cadastrarAbastecimento está sendo executado");

    this.insereAbastecimento(abastecimento);

    this.abastecimentos = this.selecionarTodos(abastecimento.veiculoId);
    this.abastecimentoStorage.atualizarLocalStorageFromJsonServer(this.abastecimentos);

    console.log("AbastecimentoService cadastrarAbastecimento foi finalizado");
  }


  selecionarTodos(veiculoId: number){

    console.log("AbastecimentoService selecionarTodos foi chamado");

    this.getAbastecimentos(veiculoId).subscribe(a => this.abastecimentos = a);
    this.abastecimentoStorage.atualizarLocalStorageFromJsonServer(this.abastecimentos);

    console.log("AbastecimentoService.selecionarTodos foi finalizada.");

    return this.abastecimentos;
  }

  getAbastecimentos(veiculoId: number) : Observable<Abastecimento[]>{
    console.log("AbastecimentoService getAbastecimentos foi chamado");

    return this.http.get<Abastecimento[]>(`${API}?veiculoId=${veiculoId}`);
  }

  selecionarAbastecimento(idVeiculo: number, idAbastecimento:number){

    console.log("AbastecimentoService.selecionarAbastecimento está sendo executado.");

    this.abastecimento = this.abastecimentoStorage.selecionarAbastecimento(idVeiculo, idAbastecimento);

    console.log("AbastecimentoService.selecionarAbastecimento foi finalizado.");

    return this.abastecimento;
  }

  deletarAbastecimento(veiculoId: number, idAbastecimento: number){

    console.log("AbastecimentoService.deletarAbastecimento está sendo executado.");

    this.abastecimentoStorage.deletarAbastecimento(veiculoId, idAbastecimento);
    this.excluirAbastecimento(idAbastecimento);

    console.log("AbastecimentoService.deletarAbastecimento foi finalizado.");

  }

  excluirAbastecimento(idAbastecimento: number){

    console.log("AbastecimentoService.excluirAbastecimento está sendo executado.");
    console.log(`${API}/${idAbastecimento}`);

    new Promise<void>((resolve, reject) => {

      this.http.delete(`${API}/${idAbastecimento}`).subscribe({
        error: (err:any) =>{
          reject(console.log(err));
        },
        next: () =>{
          resolve();
        }
      });
    });
    console.log("AbastecimentoService.excluirAbastecimento foi finalizada.");
  }

}
