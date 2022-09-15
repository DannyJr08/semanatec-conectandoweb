import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "src/app/services/api.service";
import { Router } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css']
})

export class RecordatoriosComponent implements OnInit {

  hoy: number;
  programado: number;
  todo: number;

  constructor(public userService: UsersService, private logApi: ApiService, private router: Router) {
    this.hoy = 2;
    this.programado = 5;
    this.todo = 7;

    this.logApi.getData().subscribe(
      (resp) => {
        this.taskTypeAreas = resp
        JSON.stringify(this.taskTypeAreas)
        console.log(resp)
      }
    )
  }

  taskTypeAreas: any;

  ngOnInit(): void {
  }

  // taskTypeAreas: {
  //   name: string;
  // }[] = [
  //     {
  //       name: 'Familia'
  //     },
  //     {
  //       name: 'Trabajo'
  //     },
  //     {
  //       name: 'Compras'
  //     },
  //   ];

  selectedOptions: string[] = [];

  addList(nombre: string) {
    this.logApi.createList(nombre).subscribe(
      (resp) => {
        if (Object.keys(resp).length > 0) {
          this.taskTypeAreas.push({name: nombre})
          console.log(resp)
          window.location.reload()
        }
      }
    )
  }
/////////////////////////////////////////////////////////////////////////////////////////////
  deleteList(nombre: string, id: string) {
    this.logApi.delList(nombre,id).subscribe(
      (resp) => {
        if (Object.keys(resp).length > 0) {
          // this.taskTypeAreas.splice(this.taskTypeAreas.findIndex((object) => { return object.name == nombre; }), 1)
          console.log(resp)
          window.location.reload()
        }
      }
    )
  }

  onNgModelChange(event: any) {
    console.log('on ng model change', event);
    console.log(this.selectedOptions);
  }

  titleItem = 'todo';

  filter: 'all' | 'active' | 'done' = 'all';

  allItems = [
    { description: 'Descripcion', date: new Date(2022, 9, 15), done: true },
  ];

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  addItem(description: string, dateS: string,) { //id: string
    if (description != "" && dateS != "") {
      this.logApi.createItem(description,dateS,this.selectedOptions[0]).subscribe(
        (resp) => {
          if (Object.keys(resp).length > 0) {
            console.log(resp)
            this.allItems.unshift({
              description,
              date: new Date(dateS),
              done: false
            })
          }
        }
      )
    }
  }

  deleteItem(titleItem: string) {
    const titulo = (title: any) => title == titleItem;
    this.allItems.splice(this.allItems.findIndex(titulo), 1);
  }
}