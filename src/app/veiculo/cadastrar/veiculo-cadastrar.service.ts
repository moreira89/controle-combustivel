import { Injectable } from '@angular/core';
import { WebStorageutil } from 'src/app/util/web-storage-util';
import { Constants } from '../../util/constants';
import { Veiculo } from '../veiculo';


@Injectable({providedIn: 'root'})
export class VeiculoService
{
  constructor(private wsu: WebStorageutil){
    this.wsu = wsu;
  };

  createOrUpdate(veiculo: Veiculo){

   this.wsu.add("veiculos", veiculo);

  }

  delete(veiculo: Veiculo){

  }

}
