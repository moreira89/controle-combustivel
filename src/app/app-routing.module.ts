import { VeiculoCadastrarComponent } from './veiculo/cadastrar/veiculo-cadastrar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbastecimentosComponent } from './abastecimentos/abastecimentos.component';
import { AbastecimentoComponent } from './abastecimento/abastecimento.component';
import { VeiculosComponent } from './veiculo/veiculos/veiculos.component';
//import { VeiculoComponent } from './veiculo/veiculo.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  //{path: 'veiculo/:veiculoId', component: VeiculoComponent},
  {path: 'veiculos', component: VeiculosComponent},
  {path: 'veiculos/cadastrar', component: VeiculoCadastrarComponent},
  {path: 'veiculo/editar/:veiculoId', component: VeiculoCadastrarComponent},
  {path: 'abastecimento/:abastecimentoId', component: AbastecimentoComponent},
  {path: 'veiculo/:veiculoId/abastecimentos', component: AbastecimentosComponent},
  {path: 'sobre', component: SobreComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
