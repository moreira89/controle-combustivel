import { Veiculo } from './../veiculo/veiculo';
import { Constants } from './constants';
import { LocalStorageService, SessionStorageService } from 'angular-web-storage'
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class WebStorageutil{

  constructor(private local: LocalStorageService, private session: SessionStorageService){
    this.local = local;
    this.session = session;
  }

  veiculos: Veiculo[] =[
    {
      id: 1,
      marca: 'Mitsusbishi',
      modelo: 'Pajero TR4',
      anoFabricacao: 2008,
      anoModelo: 2009,
      litrosTanque: 72,
      combustivel: 'Flex',
      cambio: 'Automático',
      odometro: 100000
    },
    {
      id: 2,
      marca: 'Hummer',
      modelo: 'S3',
      anoFabricacao: 2009,
      anoModelo: 2010,
      litrosTanque: 87,
      combustivel: 'Gasolina',
      cambio: 'Automático',
      odometro: 30000
    },
    {
      id: 3,
      marca: 'Jeep',
      modelo: 'Wrangler',
      anoFabricacao: 2010,
      anoModelo: 2011,
      litrosTanque: 79,
      combustivel: 'Gasolina',
      cambio: 'Automático',
      odometro: 50000
    }
  ];

  add(key:string, veiculo: Veiculo){
    this.veiculos.push(veiculo);
    this.set(key, this.veiculos);
  }

  value:any = null;

  get(key:string){
    return this.local.get(key);
  }

  set(key:string, veiculos: Veiculo[]) {
    this.local.set(key, veiculos);
  }

  remove(key:string) {
    this.local.remove(key);
  }

  clear() {
    this.local.clear();
  }

  tamanho(){
    return this.veiculos.length;
  }


}
