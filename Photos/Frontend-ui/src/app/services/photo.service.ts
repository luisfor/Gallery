
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PhotoService {
    public url: string;
    public identity;
    public token;
    constructor(private _http: HttpClient) {
        this.url = global.url;
    }
    test() {
        return "hello service photo";
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity != undefined && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return identity;
    }

    getToken() {
        let token = JSON.parse(localStorage.getItem('token'));

        if (token && token != null && token != undefined && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return token;
    }

    addPhoto(token, photo): Observable<any> {

        let params = JSON.stringify(photo);
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.post(this.url + 'photo', params, { headers: headers });
    }

    getPhotoByUser(userId): Observable<any> {

        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.get(this.url + 'user-photos/'+userId, { headers: headers });


    }

    deletePhotoById(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-type', 'application/json')
        .set('Authorization', this.getToken());

    return this._http.delete(this.url + 'photo/'+id, { headers: headers });
        
    }

}