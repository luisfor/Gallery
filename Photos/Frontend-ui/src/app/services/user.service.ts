import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
    public url: string;
    constructor( private _http: HttpClient){
        this.url = global.url;
    }
    test(){
        return "";
    }

    register(user): Observable<any>{
        
        //convert user to json object
        let params = JSON.stringify(user);

        //define the header
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        //make ajax request
        return this._http.post(this.url+'register', params, {headers: headers });
    }
    
}