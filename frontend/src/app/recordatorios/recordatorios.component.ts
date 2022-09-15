import { getLocaleDateFormat } from '@angular/common';
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

  addList(nombre: string) {
    if (nombre != "") {
      this.taskTypeAreas.push({name: nombre})
    };
  }

  deleteList(nombre: string) {
    this.taskTypeAreas.splice(this.taskTypeAreas.findIndex((object) => { return object.name == nombre; }), 1);
  }

  onNgModelChange(event: any) {
    console.log('on ng model change', event);
  }

  titleItem = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { titleItem: "Titulo", description: 'Descripcion', date: new Date(2022, 9, 15), done: true },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  addItem(titleItem: string, description: string, dateS: string) {
    if (titleItem != "" && description != "" && dateS != "") {
      this.allItems.unshift({
        titleItem,
        description,
        date: new Date(dateS),
        done: false
      })
    };
  }

  deleteItem(titleItem: string) {
    const titulo = (title: any) => title == titleItem;
    this.allItems.splice(this.allItems.findIndex(titulo), 1);
  }
}
