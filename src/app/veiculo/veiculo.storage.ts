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

      this.veiculo = veiculo;
      if (this.veiculo.id == null){
        this.veiculo.id = this.retornaId();
      }
      this.veiculos = this.localStorage.get("Veiculos") != null ? this.localStorage.get("Veiculos") : [];
      this.veiculos.push(veiculo);
      this.localStorage.set("Veiculos", this.veiculos!);

    }

    selecionarVeiculo(idVeiculo: number){
       this.veiculos = this.localStorage.get("Veiculos");
       return Object.assign(this.veiculos.filter(v => v.id === idVeiculo));
    }

    excluirVeiculo(idVeiculo: number){
      this.veiculos = this.localStorage.get("Veiculos");
      this.veiculos = this.veiculos.filter(v => v.id !== idVeiculo);
      return this.veiculos;
    }

    retornaId(){
      this.idVeiculo = this.localStorage.get("VeiculoID");
      console.log("A: " + this.idVeiculo);
      if (this.idVeiculo == null){
        this.idVeiculo = 1;
        console.log("B: " + this.idVeiculo);
      }

      console.log("C: " + this.idVeiculo);
      this.localStorage.set("VeiculoID", ++this.idVeiculo);
      console.log("D: " + this.idVeiculo);

      return this.idVeiculo;

    }

}
