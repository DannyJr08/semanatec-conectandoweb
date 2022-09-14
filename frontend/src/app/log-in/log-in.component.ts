import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  email: String = "";
  password: String = "";

  constructor(public userService: UsersService) {}

  login() {
    const user = {email: this.email, password: this.password};
    this.userService.login(user).subscribe( (data: any) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
  }

}
