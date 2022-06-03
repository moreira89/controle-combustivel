import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Veiculo } from '../veiculo';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})

export class VeiculosComponent implements OnInit {

  constructor(private veiculoService: VeiculoService){
    this.veiculoService = veiculoService;
  }

  ngOnInit(): void {
  }

  @Input() veiculos: Veiculo[] = this.veiculoService.selecionarTodos();

}
