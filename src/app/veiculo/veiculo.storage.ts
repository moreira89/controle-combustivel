import { Veiculo } from './veiculo';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({providedIn: "root"})
export class VeiculoStorage
{

  idVeiculo: number;
  proximoId: number;

  veiculos: Veiculo[] = [];
  veiculo: Veiculo;

    constructor(private localStorage: LocalStorageService){this.localStorage = localStorage}

    selecionarTodosVeiculos(){
      this.veiculos = this.localStorage.get("Veiculos");
      return this.veiculos;
    }

    cadastrarVeiculo(veiculo: Veiculo){

      this.veiculos = this.localStorage.get("Veiculos") != null ? this.localStorage.get("Veiculos") : [];
      this.veiculos.push(veiculo);
      this.localStorage.set("Veiculos", this.veiculos!);

    }

    cadastrarVeiculos(veiculos: Veiculo[]){

      this.localStorage.set("Veiculos", veiculos);

    }

    selecionarVeiculo(idVeiculo: number){
       this.veiculos = this.localStorage.get("Veiculos");
       return Object.assign(this.veiculos.filter(v => v.id === idVeiculo));
    }

    deletarVeiculo(idVeiculo: number){
      console.log("storage deletarVeiculo");
      this.veiculos = this.localStorage.get("Veiculos");
      this.veiculos = this.veiculos.filter(v => v.id !== idVeiculo);
      this.localStorage.set("Veiculos", this.veiculos!);
    }

    atualizarLocalStorageFromJsonServer(veiculos: Veiculo[]){
      this.localStorage.set("Veiculos", this.veiculos!);
    }

    retornaId(){
      this.idVeiculo = this.localStorage.get("VeiculoID");
      if (this.idVeiculo == null){
        this.idVeiculo = 0;
      }

      this.localStorage.set("VeiculoID", ++this.idVeiculo);

      return this.idVeiculo;

    }


}
