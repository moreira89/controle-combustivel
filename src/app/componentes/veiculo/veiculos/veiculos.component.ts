import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input,  OnInit } from '@angular/core';

import { Veiculo } from '../../../model/veiculo';
import { VeiculoService } from '../../../service/veiculo.service';

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

}
