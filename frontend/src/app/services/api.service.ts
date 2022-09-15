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

    delRem(id: string, day: string, month: string, year: string) {

        return this.HTTP.delete(
            this.userURL+"deleteReminder/"+id+"$"+day+"$"+month+"$"+year
        )

    }

    getListID(nombre: string) {

        return this.HTTP.get(
            this.userURL+"ListgetbyName/"+nombre
        )

    }

    getItem(id: string) {
        console.log(id)

        return this.HTTP.get(
            this.userURL+"reminderList/"+id
        )

    }

    getFullItem(name:any) {

        return this.HTTP.get(
            this.userURL+"reminderListName/"+name
        )

    }

    createItem(nombre:string, d:any, id:string) {

        return this.HTTP.post(
            this.userURL+"createReminder",
            {
                id_list: id,
                content: nombre,
                day: d[2],
                month: d[1],
                year: d[0]
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