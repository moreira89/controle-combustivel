import { WebStorageUtil } from './../../util/web-storage-util';
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

  CHAVE_STORAGE = 'VEICULOS';

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
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {

    console.log("VeiculoCadastrarComponent ngOnInit");

    this.combustiveis = this.veiculoCadastrarService.getCombustivel();
    this.cambios = this.veiculoCadastrarService.getCambio();

    if (this.activatedRoute.snapshot.paramMap.get('veiculoId') != null){

      console.log("VeiculoCadastrarComponent update veiculo");

      const veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;

      this.veiculosList = WebStorageUtil.get('VEICULOS');

      this.veiculoService.selecionarVeiculo(veiculoId).then(v => this.veiculoForm  = v);

      this.formVeiculo = this.formBuilder.group({
        id: new FormControl(this.veiculoForm.id),
        marca: new FormControl(this.veiculoForm.marca, Validators.required),
        modelo: new FormControl(this.veiculoForm.modelo, Validators.required),
        anoModelo: new FormControl(this.veiculoForm.anoModelo, Validators.required),
        anoFabricacao: new FormControl(this.veiculoForm.anoFabricacao, Validators.required),
        odometro: new FormControl(this.veiculoForm.odometro, Validators.required),
        litrosTanque: new FormControl(this.veiculoForm.litrosTanque, Validators.required),
        combustivel: new FormControl(this.veiculoForm.combustivel, Validators.required),
        cambio: new FormControl(this.veiculoForm.cambio, Validators.required)
      })
    }else{
      console.log("createForm");
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

    console.log("veiculo-cadastrar onSubmit");

    const veiculo: Veiculo = this.formVeiculo.value;

    this.veiculoService.cadastrarVeiculo(veiculo);

    this.formVeiculo.reset();

    this.router.navigate([`redirectHome`]);

  }

}
