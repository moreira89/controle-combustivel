import { Constants } from './../../util/constants';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';
import { Veiculo } from '../veiculo';
import { WebStorageutil } from 'src/app/util/web-storage-util';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})

export class VeiculosComponent implements OnInit {

  constructor(private wsu: WebStorageutil){}

  @Input() veiculos: Veiculo[];

   ngOnInit(): void {
  }

  OnChanges(){
    if (this.wsu.veiculos.length > 0){
      this.veiculos = this.wsu.get("veiculos")!;
    }else{
      this.veiculos= [
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
    }
  }

}
