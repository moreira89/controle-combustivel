import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';

// import Swal from 'sweetalert2';

import { Veiculo } from './../veiculo';
import { VeiculoService } from './veiculo-cadastrar.service';

@Component({
  selector: 'app-veiculo-cadastrar',
  templateUrl: './veiculo-cadastrar.component.html',
  styleUrls: ['./veiculo-cadastrar.component.css']
})

export class VeiculoCadastrarComponent implements OnInit {

  formVeiculo: FormGroup;
  submitted = false;
  edit: boolean;
  displayDialogVeiculo: boolean;
  idVeiculo: number = 1;

  combustiveis = ['Gasolina', 'Álcool', 'Flex', 'Diesel', 'Elétrico' ];
  cambios = ['Automático', 'Manual'];

  constructor(private formBuilder: FormBuilder,
              private veiculoService: VeiculoService) {}

  ngOnInit() {
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

   this.submitted = true;

    if (this.formVeiculo.value.id == null){
      this.formVeiculo.value.id = this.idVeiculo++;
    }

    const veiculo: Veiculo = this.formVeiculo.value;
    this.veiculoService.createOrUpdate(veiculo);

    // aqui você pode implementar a logica para fazer seu formulário salvar
    console.log(this.formVeiculo.value);

    alert(veiculo);

    this.formVeiculo.reset();
  }

}
