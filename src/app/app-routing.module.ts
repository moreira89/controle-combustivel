import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbastecimentosComponent } from './componentes/abastecimentos/abastecimentos.component';
import { AbastecimentoComponent } from './componentes/abastecimento/abastecimento.component';
import { VeiculosComponent } from './componentes/veiculo/veiculos/veiculos.component';
import { VeiculoCadastrarComponent } from './componentes/veiculo/cadastrar/veiculo-cadastrar.component';

import { HomeComponent } from './componentes/home/home.component';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { NotFoundComponent } from './componentes/errors/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'veiculos', component: VeiculosComponent},
  {path: 'redirectHome', component: HomeComponent},
  {path: 'redirectAbast/:veiculoId', component: VeiculosComponent},
  {path: 'redirectAbastecimentos/:veiculoId', component: VeiculosComponent},
  {path: 'veiculos/cadastrar', component: VeiculoCadastrarComponent},
  {path: 'veiculo/editar/:veiculoId', component: VeiculoCadastrarComponent},
  {path: 'abastecimento/:abastecimentoId', component: AbastecimentoComponent},
  {path: 'veiculo/:veiculoId/abastecimento/cadastrar', component: AbastecimentoComponent},
  {path: 'veiculo/:veiculoId/abastecimentos', component: AbastecimentosComponent},
  {path: 'sobre', component: SobreComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
