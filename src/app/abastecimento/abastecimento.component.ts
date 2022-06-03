import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Abastecimento } from '../abastecimento/abastecimento';
import { AbastecimentoService} from './../abastecimento/abastecimento.service';

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.component.html',
  styleUrls: ['./abastecimento.component.css']
})

export class AbastecimentoComponent implements OnInit {

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
      const abastecimentoId = +this.activatedRoute.snapshot.paramMap.get('id')!;

      if (this.activatedRoute.snapshot.paramMap.get('id') != null){

        this.abastecimento = this.abastecimentoService.selecionarAbastecimento(veiculoId, abastecimentoId);

        this.formAbastecimento = this.formBuilder.group({
          id: new FormControl(this.abastecimento.id),
          veiculoId: new FormControl(this.abastecimento.veiculoId),
          dataAbastecimento: new FormControl(this.abastecimento.dataAbastecimento, Validators.required),
          combustivel: new FormControl(this.abastecimento.combustivel, Validators.required),
          litros: new FormControl(this.abastecimento.litros, Validators.required),
          odometro: new FormControl(this.abastecimento.odometro, Validators.required),
          valorLitro: new FormControl(this.abastecimento.valorLitro, Validators.required),
          valorTotal: new FormControl(this.abastecimento.valorTotal, Validators.required),
          posto: new FormControl(this.abastecimento.posto, Validators.required)
        })
      }else{
        this.createForm(veiculoId);
      }
    }

    createForm(veiculoId: number){
      this.formAbastecimento = this.formBuilder.group({
        id: new FormControl(),
        veiculoId: new FormControl(veiculoId),
        dataAbastecimento: new FormControl('', Validators.required),
        combustivel: new FormControl('', Validators.required),
        litros: new FormControl('', Validators.required),
        odometro: new FormControl('', Validators.required),
        valorLitro: new FormControl('', Validators.required),
        valorTotal: new FormControl('', Validators.required),
        posto: new FormControl('', Validators.required)
      })
    }

    get formControls(){
      return this.formAbastecimento.controls;
    }


    onSubmit() {

      const abastecimento: Abastecimento = this.formAbastecimento.value;
      this.abastecimentoService.cadastrarAbastecimento(abastecimento);

      this.formAbastecimento.reset();
    }



}
