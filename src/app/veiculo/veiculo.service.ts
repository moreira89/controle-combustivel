import { ActivatedRoute, Router } from '@angular/router';
import { WebStorageUtil } from './../util/web-storage-util';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VeiculoStorage } from './veiculo.storage';

import { Veiculo } from './veiculo';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000/veiculos';

const CHAVE_STORAGE = 'VEICULOS';

@Injectable({providedIn: "root"})
export class VeiculoService
{
  veiculo:Veiculo;

  veiculos: Veiculo[];

  veiculosList: Veiculo[];

  veics: Veiculo[] = [];

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  constructor(public veiculoStorage: VeiculoStorage,
               private http: HttpClient,
               private router: Router){
               //this.veiculos = WebStorageUtil.get(CHAVE_STORAGE);
  }

  cadastrarVeiculo(veiculo: Veiculo){

    console.log("veiculoService.cadastrarVeiculo está sendo executado.");

    this.veiculos.push(veiculo);

    this.insereVeiculo(veiculo);

    WebStorageUtil.set(CHAVE_STORAGE, this.veiculos);

    this.veiculosList = WebStorageUtil.get(CHAVE_STORAGE);
    console.log(this.veiculosList);
    console.log("A6");

    this.router.navigate([`/redirectHome`]);

    console.log("veiculoService.cadastrarVeiculo foi finalizada.");

  }

  async insereVeiculo(veiculo: Veiculo){

      console.log("veiculoService.insereVeiculo está sendo executado.");

      console.log(this.veiculosList);

      await new Promise<void>((resolve, reject) => {

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

  selecionarTodos(){

    console.log("veiculoService.selecionarTodos está sendo executado.");

    this.veiculos = this.selecionarTodosVeiculos();

    WebStorageUtil.set(CHAVE_STORAGE, this.veiculos);

    console.log("veiculoService.selecionarTodos foi finalizada.");

    return this.veiculos;

  }

  getVeiculos() : Observable<Veiculo[]>{

    console.log("veiculoService getVeiculos foi chamado");

    return this.http.get<Veiculo[]>(API);

  }

  selecionarTodosVeiculos() : Veiculo[]{

    console.log("veiculoService selecionarTodosVeiculos HTTP foi chamado");

    let listVeics : Veiculo[] = [];

    new Promise<Veiculo[]>((resolve, reject) => {

      this.http.get<Veiculo[]>(API).subscribe({
        next: (res:any)=>{
                      this.veiculo = res.map((res:Veiculo) => {
                            const v:Veiculo = new Veiculo(res.id, res.marca, res.modelo, res.anoFabricacao, res.anoModelo, res.odometro, res.litrosTanque, res.combustivel, res.cambio);
                            listVeics.push(v);
                       });
                       resolve(listVeics);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });

    console.log("veiculoService selecionarTodosVeiculos HTTP foi finalizada.");

    return listVeics;
  }

   async selecionarVeiculo(idVeiculo:number) : Promise<Veiculo>{

    console.log("veiculoService.selecionarVeiculo está sendo executado.");

    console.log("S");
    console.log(this.veiculos);
    console.log("U");

    await new Promise<Veiculo>((resolve, reject) => {

      this.http.get<Veiculo>(`${API}/${idVeiculo}`).subscribe({
         next: (res:any)=>{
                             const v:Veiculo = new Veiculo(res.id, res.marca, res.modelo, res.anoFabricacao, res.anoModelo, res.odometro, res.litrosTanque, res.combustivel, res.cambio);
                             this.veiculo = v;
                             console.log("Promise<Veiculo> this.veiculo");
                             console.log(this.veiculo);
                        resolve(this.veiculo);
               },
         error: (err:any) =>{
           reject(console.log(err));
         }
       });
     });

    console.log("veiculoService.selecionarVeiculo foi finalizada.");

    return this.veiculo;
  }

  selVeic(idVeiculo: number) : Observable<Veiculo>{
    console.log("veiculoService getVeiculos foi chamado");

    return this.http.get<Veiculo>(`${API}/${idVeiculo}`);
  }

  deletarVeiculo(idVeiculo: number){

    console.log("veiculoService.deletarVeiculo está sendo executado.");

    //this.veiculoStorage.deletarVeiculo(idVeiculo);
    this.excluirVeiculo(idVeiculo);

    console.log("veiculoService.deletarVeiculo foi finalizada.");
  }

  excluirVeiculo(idVeiculo:number){

    console.log("veiculoService.excluirVeiculo está sendo executado.");

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

    console.log("veiculoService.excluirVeiculo foi finalizada.");


  }

recuperaVeiculo(idVeiculo: number){

  console.log("veiculoService.recuperVeiculo está sendo executado");

  let veiculo = this.veiculos.filter(v => v.id == idVeiculo);

  console.log(veiculo);

  return veiculo;

}


}
