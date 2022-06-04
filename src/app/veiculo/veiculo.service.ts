import { Observable } from 'rxjs';
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

  promiseSelecionarTodos() : Veiculo[]{

    console.log("veiculoService promiseSelecionarTodos");

    this.veics = [];

    new Promise<Veiculo[]>((resolve, reject) => {

      this.http.get<Veiculo[]>(API).subscribe({
        next: (res:any)=>{
                      this.veiculo = res.map((res:Veiculo) => {
                            const v:Veiculo = new Veiculo(res.id, res.marca, res.modelo, res.anoFabricacao, res.anoModelo, res.odometro, res.litrosTanque, res.combustivel, res.cambio);
                            this.veics.push(v);
                       });
                       resolve(this.veics);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });

    console.log(this.veics);
    console.log("veiculoService.promiseSelecionarTodos foi finalizada.");

    return this.veics;
  }

  promiseCadastrarVeiculoComSelecionar(veiculo: Veiculo) : Veiculo[]{

    console.log("veiculoService promiseCadastrarVeiculoComSelecionar");

    new Promise<Veiculo[]>((resolve, reject) => {

      this.http.post(API, JSON.stringify(veiculo));

      this.http.get<Veiculo[]>(API).subscribe({
        next: (res:any)=>{
                      this.veiculo = res.map((res:Veiculo) => {
                            const v:Veiculo = new Veiculo(res.id, res.marca, res.modelo, res.anoFabricacao, res.anoModelo, res.odometro, res.litrosTanque, res.combustivel, res.cambio);
                            this.veics.push(v);
                       });
                       resolve(this.veics);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });
    console.log("veiculoService.promiseCadastrarVeiculoComSelecionar foi finalizada.");
    return this.veics;
  }


    promiseCadastrarVeiculo(veiculo: Veiculo){

      console.log("veiculoService.promiseCadastrarVeiculo está sendo executado.");

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

  console.log("veiculoService.promiseCadastrarVeiculo foi finalizada.");
}

  promiseDeleteVeiculo(idVeiculo:number){
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


  cadastrarVeiculo(veiculo: Veiculo){

    this.veics = [];

    console.log("veiculoService.cadastrarVeiculo está sendo executado.");

    this.promiseCadastrarVeiculo(veiculo);

    this.veiculoStorage.cadastrarVeiculos(this.veiculos);
    console.log("veiculoService.cadastrarVeiculo foi finalizada.");
  }

  selecionarTodos(){

    console.log("veiculoService.selecionarTodos está sendo executado.");
    console.log("A");
    console.log(this.veiculos);
    this.veiculos = this.promiseSelecionarTodos();
    //this.veiculos = this.veiculoStorage.selecionarTodosVeiculos();
    console.log("B");
    console.log(this.veiculos);
    this.veiculoStorage.atualizarLocalStorageFromJsonServer(this.veiculos);

    console.log("veiculoService.selecionarTodos foi finalizada.");
    return this.veiculos;
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
    this.veiculo = this.selecionarVeiculo(idVeiculo);
    this.promiseDeleteVeiculo(this.veiculo.id);
    console.log("veiculoService.deletarVeiculo foi finalizada.");
  }

}
