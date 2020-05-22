import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
    public url: string;
    public identity;
    public token;
    constructor(private _http: HttpClient) {
        this.url = global.url;
    }
    test() {
        return "";
    }

    register(user): Observable<any> {

        //convert user to json object
        let params = JSON.stringify(user);

        //define the header
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        //make ajax request
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, gettoken = null): Observable<any> {

        //check if the token arrives
        if (gettoken != null) {
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');


        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity != undefined && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return identity;
    }

}