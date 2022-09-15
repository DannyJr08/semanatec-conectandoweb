import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ApiService{

    constructor(private HTTP: HttpClient) {}

    userURL = "http://217.71.203.209:8080/"

    userGet() {

        return this.HTTP.get(
            this.userURL+"user"
        )

    }
    
    userAuth(logUser:any) {

        return this.HTTP.get(
            this.userURL+"userOne/"+logUser.value.email+"$"+logUser.value.password
        )

    }

    userReg(logUser:any) {

        return this.HTTP.post(
            this.userURL+"createUser",
            {
                email: logUser.value.email,
                hash: logUser.value.password,
                signature: logUser.value.email
            }
        )

    }

    getData() {

        return this.HTTP.get(
            this.userURL+"list"
        )

    }

    getRem(element:any) {

        return this.HTTP.get(
            this.userURL+"reminderList/"+element.id
        )

    }
}