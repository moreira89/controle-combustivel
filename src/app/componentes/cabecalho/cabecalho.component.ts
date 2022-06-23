import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  url = 'https://cdn-icons-png.flaticon.com/512/890/890964.png';
  titlePic = "Logo da SK";

  constructor() { }

  ngOnInit(): void {
  }


}
