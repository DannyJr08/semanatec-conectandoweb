import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public userService: UsersService, private logApi: ApiService) {}

  logUser = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  login() {
    this.logApi.userGet().subscribe(
      (resp) => {
        console.log(resp)
      }
    )
    // console.log(this.logUser.value.email);      
  }

  ngOnInit(): void {
  }

}
