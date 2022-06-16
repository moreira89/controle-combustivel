import { Observable } from 'rxjs';
import { Cambio } from './../cambio';
import { Combustivel } from './../combustivel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class VeiculoCadastrarService
{
  constructor(private http: HttpClient){  };

  cambios: Cambio[]=[];
  combustiveis: Combustivel[] = [];

  selecionaCambio(): Observable<Cambio[]>{

    console.log("VeiculoCadastrarService selecionaCambio foi chamado");

    return this.http.get<Cambio[]>(API);

  }

  getCambio(){
    this.selecionaCambio().subscribe(cambios => this.cambios = cambios);
    return this.cambios;
  }


  selecionaCombustivel(): Observable<Cambio[]>{

    console.log("VeiculoCadastrarService selecionaCombustivel foi chamado");

    return this.http.get<Combustivel[]>(API);

  }

  getCombustivel(){
    this.selecionaCombustivel().subscribe(combustiveis => this.combustiveis = combustiveis);
    return this.combustiveis;
  }

}
