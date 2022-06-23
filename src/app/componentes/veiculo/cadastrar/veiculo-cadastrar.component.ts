import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';

import { Veiculo } from '../../../model/veiculo';
import { Cambio } from '../../../model/cambio';
import { Combustivel } from '../../../model/combustivel';
import { VeiculoService } from '../../../service/veiculo.service';
import { VeiculoCadastrarService } from '../../../service/veiculo-cadastrar.service';


@Component({
  selector: 'app-veiculo-cadastrar',
  templateUrl: './veiculo-cadastrar.component.html',
  styleUrls: ['./veiculo-cadastrar.component.css']
})


export class VeiculoCadastrarComponent implements OnInit {

  formVeiculo: FormGroup;

  veiculo: Veiculo;
  selected: string;
  veiculosList: Veiculo[];

  @Input() cambios: Cambio[] =[];
  @Input() combustiveis: Combustivel[] = [];
  @Input() veiculoForm: Veiculo;

  constructor(private formBuilder: FormBuilder,
              private veiculoService: VeiculoService,
              private veiculoCadastrarService: VeiculoCadastrarService,
              private router: Router) {}

  ngOnInit() {

    console.log("VeiculoCadastrarComponent ngOnInit");

    this.combustiveis = this.veiculoCadastrarService.getCombustivel();
    this.cambios = this.veiculoCadastrarService.getCambio();

    this.createForm();
  }

  createForm() {
    this.formVeiculo = this.formBuilder.group({
      id: new FormControl(),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      anoModelo: new FormControl('', Validators.required),
      anoFabricacao: new FormControl('', Validators.required),
      odometro: new FormControl('', Validators.required),
      litrosTanque: new FormControl('', Validators.required),
      combustivel: new FormControl('', Validators.required),
      cambio: new FormControl('', Validators.required)
    })
  }

  get formControls(){
    return this.formVeiculo.controls;
  }

  onSubmit() {

    console.log("veiculo-cadastrar onSubmit");

    const veiculo: Veiculo = this.formVeiculo.value;

    this.veiculoService.cadastrarVeiculo(veiculo);

    this.formVeiculo.reset();

    this.router.navigate([`redirectHome`]);

  }

}
