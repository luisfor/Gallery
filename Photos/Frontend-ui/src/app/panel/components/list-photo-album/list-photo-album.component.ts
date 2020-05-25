import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Photo } from '../../../models/photo';
import { groupPhoto } from '../../../models/groupPhoto';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { AlbumService } from '../../../services/album.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-list-photo-album',
  templateUrl: './list-photo-album.component.html',
  styleUrls: ['./list-photo-album.component.css'],
  providers: [UserService, PhotoService, AlbumService]
})
export class ListPhotoAlbumComponent implements OnInit {

  public page_title: string;
  public photo: Photo[];
  public groupPhoto: groupPhoto;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;
  public idAlbum;
  public idPhoto;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _photoService: PhotoService,
    private _albumService: AlbumService
  ) {
    this.page_title = 'list photo album';
    this.identity = this._albumService.getIdentity();
    this.token = this._albumService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    /* this._route.params.subscribe(params => {
       let search = params['search'];
       this.page_title = this.page_title;
       this.getPhotoSearch(search);
     });*/
    this.getPhotoAlbumById();
  }
  /*
    getPhotoSearch(search){
      this._photoService.search(search).subscribe(
        response => {
          if (response.photo) {
            this.photo = response.photo;
          } else {
            
          }
        },
        error => {
          console.log(error);
          
        }
      );
    }
  */

  getPhotoAlbumById() {
    let userId = this.identity._id;
    this._route.params.subscribe(params => {
      this.idAlbum = params['id'];
      //console.log(idAlbum);
      this._albumService.getAlbumBy(this.idAlbum).subscribe(
        response => {
          if (response.groupPhoto == []) {
            console.log(this.status);
          } else {
            this.groupPhoto = response.groupPhoto;
          }
        },
        error => {
          console.log(error);

        }
      );

    });
  }

}
