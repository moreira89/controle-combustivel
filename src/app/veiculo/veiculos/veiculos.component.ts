import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input,  OnInit } from '@angular/core';

import { Veiculo } from '../veiculo';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.css'],
})

export class VeiculosComponent implements OnInit{

  @Input() veiculos: Veiculo[] = [];

  constructor(private veiculoService: VeiculoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){
  }

  ngOnInit(){
    console.log(this.router.url);
    console.log(this.router.url.search("redirectAbast") > 0);
    console.log(this.activatedRoute.snapshot.paramMap.get('veiculoId'));
    if (this.router.url.search("redirectAbast") > 0){
      let codigo = this.activatedRoute.snapshot.paramMap.get('veiculoId');
      this.router.navigate([`veiculo/${codigo}/abastecimentos`]);
    }
    this.veiculos = this.veiculoService.selecionarTodos();
  }

  excluirVeiculo(veiculoId: number){
    this.veiculoService.deletarVeiculo(veiculoId);
    this.router.navigate(['redirectHome']);
  }

  editarVeiculo(veiculoId:number){
    let veiculo = this.veiculoService.recuperaVeiculo(veiculoId);
    this.router.navigate(['veiculos/cadastrar']);
  }

}
