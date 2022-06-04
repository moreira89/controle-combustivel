import { Cambio } from './../cambio';
import { Combustivel } from './../combustivel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000';

@Injectable({providedIn: 'root'})
export class VeiculoCadastrarService
{
  constructor(private http: HttpClient){  };

  cambios: Cambio[]=[];
  combustiveis: Combustivel[] = [];

  promiseSelecionarCambios() : Cambio[]{

    new Promise<Cambio[]>((resolve, reject) => {

      this.http.get<Cambio[]>(`${API}/cambios`).subscribe({
        next: (res:any)=>{
                      var c:Cambio[] = res.map((res:Cambio) => {
                            const s = res;
                            this.cambios.push(s);
                       });
                       resolve(this.cambios);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });
    return this.cambios;
  }

  promiseSelecionarCombustiveis() : Combustivel[]{

    new Promise<Combustivel[]>((resolve, reject) => {

      this.http.get<Combustivel[]>(`${API}/combustiveis`).subscribe({
        next: (res:any)=>{
                      var c:Combustivel[] = res.map((res:Combustivel) => {
                            const s = res;
                            this.combustiveis.push(s);
                       });
                       resolve(this.combustiveis);
              },
        error: (err:any) =>{
          reject(console.log(err));
        }
      });
    });
    return this.combustiveis;
  }

}
