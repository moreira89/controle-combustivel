
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

    console.log(this.activatedRoute);

    //const veiculoId = this.activatedRoute.snapshot.params.veiculoId;

    const url: string[] = (this.activatedRoute).toString().split('/');
    const veiculoId : number = parseInt(url[1]);

    this.abastecimentos = this.abastecimentoService
                      .listFromVeiculo(veiculoId);

  }

}
