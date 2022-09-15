import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from "src/app/services/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  constructor(public userService: UsersService, private logApi: ApiService, private router: Router) {}

  logUser = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  login() {
    this.logApi.userAuth(this.logUser).subscribe(
      (resp) => {
        // JSON.stringify(resp)
        if (Object.keys(resp).length > 0) {
          console.log(resp)
          this.router.navigate(['inicio']);
        }
      }
    )
    // console.log(this.logUser.value.email);      
  }

  register() {
    this.logApi.userReg(this.logUser).subscribe(
      (resp) => {
        if (Object.keys(resp).length > 0) {
          console.log(resp)
          this.router.navigate(['inicio']);
        }
      }
    )     
  }

  ngOnInit(): void {
  }

}
