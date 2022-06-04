import { Cambio } from './../cambio';
import { Combustivel } from './../combustivel';
import { VeiculoCadastrarService } from './veiculo-cadastrar.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VeiculoService } from './../veiculo.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';

import { Veiculo } from './../veiculo';

@Component({
  selector: 'app-veiculo-cadastrar',
  templateUrl: './veiculo-cadastrar.component.html',
  styleUrls: ['./veiculo-cadastrar.component.css']
})

export class VeiculoCadastrarComponent implements OnInit {

  formVeiculo: FormGroup;

  veiculo: Veiculo;
  selected: string;

  @Input() cambios: Cambio[] =[];
  @Input() combustiveis: Combustivel[] = [];

  constructor(private formBuilder: FormBuilder,
              private veiculoService: VeiculoService,
              private veiculoCadastrarService: VeiculoCadastrarService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {

    this.combustiveis = this.veiculoCadastrarService.promiseSelecionarCombustiveis();
    this.cambios = this.veiculoCadastrarService.promiseSelecionarCambios();

    if (this.activatedRoute.snapshot.paramMap.get('veiculoId') != null){

      const veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;

      this.veiculo = this.veiculoService.selecionarVeiculo(veiculoId);

      this.formVeiculo = this.formBuilder.group({
        id: new FormControl(veiculoId),
        marca: new FormControl(this.veiculo.marca, Validators.required),
        modelo: new FormControl(this.veiculo.modelo, Validators.required),
        anoModelo: new FormControl(this.veiculo.anoModelo, Validators.required),
        anoFabricacao: new FormControl(this.veiculo.anoFabricacao, Validators.required),
        odometro: new FormControl(this.veiculo.odometro, Validators.required),
        litrosTanque: new FormControl(this.veiculo.litrosTanque, Validators.required),
        combustivel: new FormControl(this.veiculo.combustivel, Validators.required),
        cambio: new FormControl(this.veiculo.cambio, Validators.required)
      })
    }else{
      this.createForm();
    }
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

    const veiculo: Veiculo = this.formVeiculo.value;
    console.log("veiculo-cadastrar onSubmit");
    this.veiculoService.cadastrarVeiculo(veiculo);

    this.formVeiculo.reset();

    this.router.navigate(["/veiculos"]);

  }

}
