import { Router } from '@angular/router';
import { WebStorageUtil } from './../util/web-storage-util';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbastecimentoStorage } from './abastecimento.storage';

import { Abastecimento } from './abastecimento';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000/abastecimentos';

const CHAVE_STORAGE = 'ABASTECIMENTOS';

@Injectable({providedIn: "root"})
export class AbastecimentoService
{
  abastecimento:Abastecimento;

  abastecimentos: Abastecimento[] = [];

  constructor(public abastecimentoStorage: AbastecimentoStorage,
              private http: HttpClient,
              private router: Router){}

  cadastrarAbastecimento(abastecimento: Abastecimento){

    console.log("AbastecimentoService cadastrarAbastecimento está sendo executado");

    this.abastecimentos.push(abastecimento);

    this.insereAbastecimento(abastecimento);

    WebStorageUtil.set(CHAVE_STORAGE, this.abastecimentos);

    //this.router.navigate([`/redirectAbast/${abastecimento.veiculoId}`]);

    console.log("AbastecimentoService cadastrarAbastecimento foi finalizado");
  }

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




  selecionarTodos(veiculoId: number){

    console.log("AbastecimentoService selecionarTodos foi chamado");

    this.abastecimentos = this.selecionarTodosAbastecimentos(veiculoId);
    WebStorageUtil.set(CHAVE_STORAGE, this.abastecimentos);

    console.log("AbastecimentoService.selecionarTodos foi finalizada.");

    return this.abastecimentos;
  }

  selecionarTodosAbastecimentos(veiculoId: number) : Abastecimento[]{

    console.log("AbastecimentoService selecionarTodosAbastecimentos HTTP foi chamado");

    let listAbast : Abastecimento[] = [];

    new Promise<Abastecimento[]>((resolve, reject) => {

      this.http.get<Abastecimento[]>(`${API}?veiculoId=${veiculoId}`).subscribe({
        next: (res:any)=>{
                      this.abastecimento = res.map((res:Abastecimento) => {
                            const a:Abastecimento = new Abastecimento(res.id, res.veiculoId, res.dataAbastecimento, res.combustivel, res.litros, res.odometro, res.valorLitro, res.valorTotal, res.posto);
                            listAbast.push(a);
                       });
                       resolve(listAbast);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });

    console.log("AbastecimentoService selecionarTodosAbastecimentos HTTP foi finalizada.");

    return listAbast;
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

  recuperaAbastecimento(veiculoId: number, idAbastecimento: number){

    console.log("AbastecimentoService.recuperaAbastecimento está sendo executado");

    let abastecimento = this.abastecimentos.filter(v => {
                              v.id == idAbastecimento && v.veiculoId == veiculoId;
                              return new Abastecimento(v.id, v.veiculoId, v.dataAbastecimento, v.combustivel, v.litros, v.odometro, v.valorLitro, v.valorTotal, v.posto);
                            });

    let abast:Abastecimento = abastecimento[0];

    console.log(abast);

    return abast;

  }

}
