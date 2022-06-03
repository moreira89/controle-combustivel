import { Abastecimento } from './abastecimento';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({providedIn: "root"})
export class AbastecimentoStorage
{

  idAbastecimento: number;
  proximoId: number;

  abastecimentos: Abastecimento[] = [];
  abastecimento: Abastecimento;

    constructor(private localStorage: LocalStorageService){this.localStorage = localStorage}

    selecionarTodosAbastecimentos(idVeiculo: number){
      this.abastecimentos = this.localStorage.get("Abastecimentos");
      this.abastecimentos = this.abastecimentos.filter(v => v.veiculoId === idVeiculo);
      return this.abastecimentos;
    }

    cadastrarAbastecimento(abastecimento: Abastecimento){

      this.abastecimento = abastecimento;
      if (this.abastecimento.id == null){
        this.abastecimento.id = this.retornaId();
      }

      this.abastecimentos = this.localStorage.get("Abastecimentos") != null ? this.localStorage.get("Abastecimentos") : [];
      this.abastecimentos.push(abastecimento);
      this.localStorage.set("Abastecimentos", this.abastecimentos!);

    }

    selecionarAbastecimento(idVeiculo: number, idAbastecimento: number){
       this.abastecimentos = this.localStorage.get("Abastecimentos");
       return Object.assign(this.abastecimentos.filter(v => v.id === idAbastecimento && v.veiculoId === idVeiculo));
    }

    deletarAbastecimento(idVeiculo: number, idAbastecimento: number){
      this.abastecimentos = this.localStorage.get("Abastecimentos");
      this.abastecimentos = this.abastecimentos.filter(v => v.id !== idAbastecimento && v.veiculoId === idVeiculo);
      this.localStorage.set("Abastecimentos", this.abastecimentos!);
    }

    retornaId(){
      this.idAbastecimento = this.localStorage.get("AbastecimentoID");
      if (this.idAbastecimento == null){
        this.idAbastecimento = 0;
      }

      this.localStorage.set("AbastecimentoID", ++this.idAbastecimento);

      return this.idAbastecimento;

    }

}
