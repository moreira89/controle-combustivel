import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Abastecimento } from '../../model/abastecimento';
import { AbastecimentoService} from '../../service/abastecimento.service';

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

  veiculoId:number;

  constructor(
    private formBuilder: FormBuilder,
    private abastecimentoService : AbastecimentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router){
      this.veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;
    }

    ngOnInit() {
      console.log("AbastecimentoComponent ngOnInit");
      this.createForm(this.veiculoId);
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

      console.log("AbastecimentoComponent onSubmit");

      const abastecimento: Abastecimento = this.formAbastecimento.value;
      this.abastecimentoService.cadastrarAbastecimento(abastecimento);

      this.formAbastecimento.reset();

      this.router.navigate([`/redirectAbast/${abastecimento.veiculoId}`]);
    }



}
