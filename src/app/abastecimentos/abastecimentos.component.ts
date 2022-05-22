
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Abastecimento } from '../abastecimento/abastecimento';
import { AbastecimentoService } from './abastecimentos.service';

@Component({
  selector: 'app-abastecimentos',
  templateUrl: './abastecimentos.component.html',
  styleUrls: ['./abastecimentos.component.css']
})

export class AbastecimentosComponent implements OnInit {

  abastecimentos: Abastecimento[] = [];

  constructor(
    private abastecimentoService : AbastecimentoService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    const veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;

    this.abastecimentos = this.abastecimentoService
                                    .listFromVeiculo(veiculoId);

  }

}
