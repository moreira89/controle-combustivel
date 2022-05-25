import { Component, OnInit } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';
import { Veiculo } from '../veiculo';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css']
})

export class VeiculosComponent implements OnInit {

  @Input() veiculos: Veiculo[] = [
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

  ngOnInit(): void {
  }

}
