import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RodapeComponent } from './rodape/rodape.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { AbastecimentosComponent } from './abastecimentos/abastecimentos.component';
import { AbastecimentoComponent } from './abastecimento/abastecimento.component';
import { VeiculosComponent } from './veiculo/veiculos/veiculos.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { HomeComponent } from './home/home.component';
/*import { AbastecimentoModule } from './abastecimento/abastecimento.module';*/
import { ErrorsModule } from './errors/errors.module';
import { SobreComponent } from './sobre/sobre.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CabecalhoComponent,
    HomeComponent,
    VeiculoComponent,
    VeiculosComponent,
    AbastecimentoComponent,
    AbastecimentosComponent,
    SobreComponent
  ],
  imports: [
    BrowserModule,
    /*AbastecimentoModule,*/
    AppRoutingModule,
    ErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
