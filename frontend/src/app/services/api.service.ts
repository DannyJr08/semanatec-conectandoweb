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

    getDataByUser(id: string) {

        return this.HTTP.get(
            this.userURL+"listUser/"+id
        )

    }

    getRem(element:any) {

        return this.HTTP.get(
            this.userURL+"reminderList/"+element.id
        )

    }

    createList(nombre:string) {

        return this.HTTP.post(
            this.userURL+"createList/",
            {
                name: nombre,
                id_user: "kHrsvxBt5VzHgbogBFqq"
            }
        )

    }

    delList(nombre:string, id:string) {

        return this.HTTP.delete(
            this.userURL+"deleteList/"+id+"$kHrsvxBt5VzHgbogBFqq$"+nombre
        )

    }

    getItem(nombre:string, date:string, id:string) {

        return this.HTTP.get(
            this.userURL+"reminderList/"+id
        )

    }

    createItem(nombre:string, date:string, id:string) {

        return this.HTTP.post(
            this.userURL+"createReminder",
            {
                "id_list": id,
                "content": nombre
            }
            
        )

    }
}

export class myStorage {
    public user;
    public list;
    public reminder;
    constructor() {
        this.user = '';
        this.list = '';
        this.reminder = '';
    }
    getUser() {
        return this.user;
    }
    getList() {
        return this.list;
    }
    getReminder() {
        return this.reminder;
    }
    setUser(data: any) {
        this.user = data;
    }
    setList(data: any) {
        this.list = data;
    }
    setReminder(data: any) {
        this.reminder = data;
    }
}