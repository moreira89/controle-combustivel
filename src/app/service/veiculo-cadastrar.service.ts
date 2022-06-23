import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

import { Cambio } from '../model/cambio';
import { Combustivel } from '../model/combustivel';


const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class VeiculoCadastrarService
{
  constructor(private http: HttpClient){  };

  @Input() cambios: Cambio[]=[];
  @Input() combustiveis: Combustivel[] = [];

  getCambio(){
    console.log("VeiculoCadastrarService getCambio foi chamado");
    this.selecionaCambio().subscribe(cambios => this.cambios = cambios);
    return this.cambios;
  }

  selecionaCambio(): Observable<Cambio[]>{
    console.log("VeiculoCadastrarService selecionaCambio foi chamado");
    return this.http.get<Cambio[]>(API);
  }

  getCombustivel(){
    console.log("VeiculoCadastrarService getCombustivel foi chamado");
    this.selecionaCombustivel().subscribe(combustiveis => this.combustiveis = combustiveis);
    return this.combustiveis;
  }

  selecionaCombustivel(): Observable<Combustivel[]>{
    console.log("VeiculoCadastrarService selecionaCombustivel foi chamado");
    return this.http.get<Combustivel[]>(API);
  }

}
