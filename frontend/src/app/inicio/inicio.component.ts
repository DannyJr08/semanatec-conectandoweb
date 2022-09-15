import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "src/app/services/api.service";
import { Router } from '@angular/router';
import * as moment from 'moment'
import { myStorage } from 'src/app/services/api.service';
@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  constructor(public userService: UsersService, private logApi: ApiService, private router: Router, private myStorage: myStorage) {
    this.logApi.getData().subscribe(
      (resp) => {
        this.arrayList = resp
        console.log(resp)
      }
    )

    // this.arrayList.forEach(element => {
      // console.log(element)
      // this.logApi.getRem(element).subscribe(
      //   (resp) => {
      //     this.arrayRem = resp
      //     console.log(resp)
      //   }
      // )
    // });
  }

  arrayList: any;
  arrayRem: any;

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  monthSelect!: any[];
  dateSelect: any;
  dateValue: any;

  ngOnInit(): void {
    this.getDaysFromDate(9, 2022)
  }

  getDaysFromDate(month: any, year: any) {

    const startDate = moment.utc(`${year}/${month}/02`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


  }
}
