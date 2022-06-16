import { FormGroup } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Abastecimento } from '../abastecimento/abastecimento';
import { AbastecimentoService} from './../abastecimento/abastecimento.service';

@Component({
  selector: 'app-abastecimentos',
  templateUrl: './abastecimentos.component.html',
  styleUrls: ['./abastecimentos.component.css']
})

export class AbastecimentosComponent implements OnInit {

  formAbastecimento: FormGroup;

  abastecimentos: Abastecimento[] = [];

  abastecimento: Abastecimento;


  combustiveis = ['Gasolina', 'Álcool', 'Flex', 'Diesel', 'Elétrico' ];

  constructor(
    private abastecimentoService : AbastecimentoService,
    private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      const veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;
      this.getAbastecimentos(veiculoId);
    }

    getAbastecimentos(veiculoId: number){
      this.abastecimentoService.getAbastecimentos(veiculoId).subscribe(abast => this.abastecimentos = abast);
    }

    excluirAbastecimento(veiculoId: number, idAbastecimento: number){
      this.abastecimentoService.deletarAbastecimento(veiculoId, idAbastecimento);
    }


}
