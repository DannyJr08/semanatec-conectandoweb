import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css']
})
export class RecordatoriosComponent implements OnInit {

  hoy: number;
  programado: number;
  todo: number;
  listalistas: string[] = ['Familia', 'Trabajo', 'Compras'];
  constructor() { 
    this.hoy = 2;
    this.programado = 5;
    this.todo = 7;
  }

  ngOnInit(): void {
  }

}
