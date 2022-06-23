import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Abastecimento } from '../../model/abastecimento';
import { AbastecimentoService} from '../../service/abastecimento.service';

@Component({
  selector: 'app-abastecimentos',
  templateUrl: './abastecimentos.component.html',
  styleUrls: ['./abastecimentos.component.css']
})

export class AbastecimentosComponent implements OnInit {

  @Input() abastecimentos: Abastecimento[] = [];

  abastecimento: Abastecimento;

  combustiveis = ['Gasolina', 'Álcool', 'Flex', 'Diesel', 'Elétrico' ];

  constructor(
    private abastecimentoService : AbastecimentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

    ngOnInit() {
      const veiculoId = +this.activatedRoute.snapshot.paramMap.get('veiculoId')!;
      this.abastecimentos = this.abastecimentoService.selecionarTodos(veiculoId);
    }

     excluirAbastecimento(veiculoId: number, idAbastecimento: number){
      this.abastecimentoService.deletarAbastecimento(idAbastecimento);
      this.router.navigate([`redirectAbast/${veiculoId}`]);
    }

}
