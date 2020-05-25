
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class AlbumService {
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

    addAlbum(token, album): Observable<any> {

        let params = JSON.stringify(album);
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.post(this.url + 'album', params, { headers: headers });
    }

    getAlbumByUser(userId): Observable<any> {

        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url + 'user-album/'+userId, { headers: headers });


    }

    addPhotoAlbums(token, album): Observable<any> {

        let params = JSON.stringify(album);
        //console.log(params);
        
        let headers = new HttpHeaders().set('Content-type', 'application/json')
            .set('Authorization', this.getToken());

        return this._http.post(this.url + 'groupPhoto', params, { headers: headers });
    }
/*
    deletePhotoById(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-type', 'application/json')
        .set('Authorization', this.getToken());

    return this._http.delete(this.url + 'photo/'+id, { headers: headers });
        
    }
    search(searchString): Observable<any>{
        return this._http.get(this.url+'search/'+searchString);
    }
*/
}