import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Abastecimento } from '../model/abastecimento';


const API = 'http://localhost:3000/abastecimentos';


@Injectable({providedIn: "root"})
export class AbastecimentoService
{
  abastecimento:Abastecimento;

  abastecimentos: Abastecimento[] = [];

  constructor(private http: HttpClient){}

  cadastrarAbastecimento(abastecimento: Abastecimento){

    console.log("AbastecimentoService cadastrarAbastecimento está sendo executado");

    this.abastecimentos.push(abastecimento);

    this.insereAbastecimento(abastecimento);

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

    console.log("AbastecimentoService.selecionarTodos foi finalizada.");

    return this.abastecimentos;
  }

  selecionarTodosAbastecimentos(veiculoId: number) : Abastecimento[]{

    console.log("AbastecimentoService selecionarTodosAbastecimentos foi chamado");

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

    console.log("AbastecimentoService selecionarTodosAbastecimentos foi finalizada.");

    return listAbast;
  }

  getAbastecimentos(veiculoId: number) : Observable<Abastecimento[]>{
    console.log("AbastecimentoService getAbastecimentos foi chamado");

    return this.http.get<Abastecimento[]>(`${API}?veiculoId=${veiculoId}`);
  }

  deletarAbastecimento(idAbastecimento: number){

    console.log("AbastecimentoService.deletarAbastecimento está sendo executado.");

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
