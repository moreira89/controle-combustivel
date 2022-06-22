import { Veiculo } from './veiculo';
import { Inject, Injectable } from '@angular/core';
//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
//import {LOCAL_STORAGE, WINDOW} from '@ng-web-apis/common';


@Injectable({
  providedIn: 'root'
})
export class VeiculoStorage
{

  idVeiculo: number;
  proximoId: number;

  veiculos: Veiculo[] = [];
  veiculo: Veiculo;

    constructor(){}

    selecionarTodosVeiculos(){
      console.log("VeiculoStorage selecionarTodosVeiculos foi chamado");

      this.veiculos = JSON.parse(localStorage.getItem("Veiculos")!);

      console.log("VeiculoStorage selecionarTodosVeiculos foi finalizado");

      return this.veiculos;
    }

    cadastrarVeiculo(veiculo: Veiculo){
      console.log("VeiculoStorage cadastrarVeiculo");
      console.log(veiculo);

      let listVeiculos:Veiculo[] = [];

      console.log(listVeiculos);
      console.log(listVeiculos);
      listVeiculos.push(veiculo);
      localStorage.setItem("Veiculos", JSON.stringify(this.veiculos));
    }

    cadastrarVeiculos(veiculos: Veiculo[]){
      console.log("VeiculoStorage cadastrarVeiculos");
      console.log(veiculos);
      localStorage.setItem("Veiculos", JSON.stringify(this.veiculos));
    }

    selecionarVeiculo(idVeiculo: number){
       this.veiculos = JSON.parse(localStorage.getItem("Veiculos")!);
       return Object.assign(this.veiculos.filter(v => v.id === idVeiculo));
    }

    deletarVeiculo(idVeiculo: number){
      console.log("VeiculoStorage deletarVeiculo");
      this.veiculos = JSON.parse(localStorage.getItem("Veiculos")!);
      this.veiculos = this.veiculos.filter(v => v.id !== idVeiculo);
      localStorage.setItem("Veiculos", JSON.stringify(this.veiculos));
    }

    atualizarLocalStorageFromJsonServer(veiculos: Veiculo[]){
      console.log("VeiculoStorage atualizarLocalStorageFromJsonServer");
      console.log("veiculos");
      console.log(veiculos);
      localStorage.setItem("Veiculos", JSON.stringify(this.veiculos));

      let v = JSON.parse(localStorage.getItem("Veiculos")!);
      console.log("v");
      console.log(v);
    }

 }
