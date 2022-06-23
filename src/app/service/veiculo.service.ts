import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Veiculo } from '../model/veiculo';


const API = 'http://localhost:3000/veiculos';

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

  constructor(private http: HttpClient){
  }

  cadastrarVeiculo(veiculo: Veiculo){

    console.log("veiculoService.cadastrarVeiculo está sendo executado.");

    this.veiculos.push(veiculo);

    this.cadastraVeiculo(veiculo).subscribe(() => alert(`Veiculo ${veiculo.marca} ${veiculo.modelo} cadastrado com sucesso!`));

    console.log("veiculoService.cadastrarVeiculo foi finalizada.");

  }

  cadastraVeiculo(veiculo: Veiculo): Observable<any> {
    return this.http.post<any>(API, veiculo);
  }

  async insereVeiculo(veiculo: Veiculo){

      console.log("veiculoService.insereVeiculo está sendo executado.");

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

    //this.getVeiculos().subscribe(veics => this.veiculos = veics);

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

  deletarVeiculo(idVeiculo: number){

    console.log("veiculoService.deletarVeiculo está sendo executado.");

    this.excluirVeiculo(idVeiculo);

    console.log("veiculoService.deletarVeiculo foi finalizada.");
  }

  excluirVeiculo(idVeiculo:number){

    console.log("veiculoService.excluirVeiculo está sendo executado.");

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

}
