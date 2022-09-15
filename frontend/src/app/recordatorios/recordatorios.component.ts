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
  constructor() { 
    this.hoy = 2;
    this.programado = 5;
    this.todo = 7;
  }

  ngOnInit(): void {
  }

  taskTypeAreas: {
    name: string;
  }[] = [
    {
      name: 'Familia'
    },
    {
      name: 'Trabajo'
    },
    {
      name: 'Compras'
    },
  ];
  selectedOptions: string[] = [];

  onNgModelChange(event: any){
    console.log('on ng model change', event);
  }
  
}
