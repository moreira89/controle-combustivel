import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgSelectModule } from '@ng-select/ng-select';
import { AngularWebStorageModule } from 'angular-web-storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RodapeComponent } from './rodape/rodape.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { AbastecimentosComponent } from './abastecimentos/abastecimentos.component';
import { AbastecimentoComponent } from './abastecimento/abastecimento.component';
import { VeiculosComponent } from './veiculo/veiculos/veiculos.component';
import { VeiculoCadastrarComponent } from './veiculo/cadastrar/veiculo-cadastrar.component';

import { HomeComponent } from './home/home.component';
import { ErrorsModule } from './errors/errors.module';
import { SobreComponent } from './sobre/sobre.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    CabecalhoComponent,
    HomeComponent,
    VeiculoCadastrarComponent,
    VeiculosComponent,
    AbastecimentoComponent,
    AbastecimentosComponent,
    SobreComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularWebStorageModule,
    HttpClientModule,
    ErrorsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt'},
{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
