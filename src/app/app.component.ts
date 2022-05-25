import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SK - Controle Combustível';

  constructor(){}

  ngOnInit():void{}


  onSelectChange(event : Event)
  {
    alert("O valor é ${this.donationValue");
  }


}
