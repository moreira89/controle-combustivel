import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VeiculoStorage } from './veiculo.storage';

import { Veiculo } from './veiculo';
import { Injectable } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';

const API = 'http://localhost:3000/veiculos';

@Injectable({providedIn: "root"})
export class VeiculoService
{
  veiculo:Veiculo;

  veiculos: Veiculo[] = [];

  veics: Veiculo[] = [];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  constructor(public veiculoStorage: VeiculoStorage,
               private http: HttpClient){
  }

  insereVeiculo(veiculo: Veiculo){

      console.log("veiculoService.insereVeiculo está sendo executado.");

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

  console.log("veiculoService.insereVeiculo foi finalizada.");
}

  cadastrarVeiculo(veiculo: Veiculo){

    this.veics = [];

    console.log("veiculoService.cadastrarVeiculo está sendo executado.");

    this.insereVeiculo(veiculo);

    this.veiculos = this.selecionarTodos();
    this.veiculoStorage.cadastrarVeiculos(this.veiculos);

    console.log("veiculoService.cadastrarVeiculo foi finalizada.");

  }

  selecionarTodos(){

    console.log("veiculoService.selecionarTodos está sendo executado.");

    this.getVeiculos().subscribe(v => this.veiculos = v);
    this.veiculoStorage.atualizarLocalStorageFromJsonServer(this.veiculos);

    console.log("veiculoService.selecionarTodos foi finalizada.");

    return this.veiculos;
  }

  getVeiculos() : Observable<Veiculo[]>{

    console.log("veiculoService getVeiculos foi chamado");

    return this.http.get<Veiculo[]>(API);

  }

  selecionarVeiculo(idVeiculo:number){

    console.log("veiculoService.selecionarVeiculo está sendo executado.");

    this.veiculo = this.veiculoStorage.selecionarVeiculo(idVeiculo);

    console.log("veiculoService.selecionarVeiculo foi finalizada.");

    return this.veiculo;
  }

  deletarVeiculo(idVeiculo: number){

    console.log("veiculoService.deletarVeiculo está sendo executado.");

    this.veiculoStorage.deletarVeiculo(idVeiculo);
    this.excluirVeiculo(idVeiculo);

    console.log("veiculoService.deletarVeiculo foi finalizada.");
  }

  excluirVeiculo(idVeiculo:number){

    console.log("veiculoService.promiseDeleteVeiculo está sendo executado.");

    console.log(`${API}/${idVeiculo}`);

    new Promise<void>((resolve, reject) => {

      this.http.delete(`${API}/${idVeiculo}`).subscribe({
        error: (err:any) =>{
          reject(console.log(err));
        },
        next: () =>{
          resolve();
        }
      });
    });

    console.log("veiculoService.promiseDeleteVeiculo foi finalizada.");


  }

}
