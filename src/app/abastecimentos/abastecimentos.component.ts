import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder,
    private abastecimentoService : AbastecimentoService,
    private activatedRoute: ActivatedRoute){}

    ngOnInit() {
      const veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;
      this.abastecimentos = this.abastecimentoService.selecionarTodos(veiculoId);
    }

    excluirAbastecimento(veiculoId: number, id: number){
      this.abastecimentoService.deletarAbastecimento(veiculoId, id);
    }


}
