import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';

import { Photo } from '../../../models/photo';
import { groupPhoto } from '../../../models/groupPhoto';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { AlbumService } from '../../../services/album.service';
import { global } from '../../../services/global';


@Component({
  selector: 'app-add-photo-album',
  templateUrl: './add-photo-album.component.html',
  styleUrls: ['./add-photo-album.component.css'],
  providers: [UserService, PhotoService, AlbumService]
})
export class AddPhotoAlbumComponent implements OnInit {
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
    this.page_title = 'select photo to upload';
    this.identity = this._albumService.getIdentity();
    this.token = this._albumService.getToken();
    this.groupPhoto = new groupPhoto('', '', '', this.identity._id, '', '');
    this.url = global.url;
  }

  ngOnInit() {
    /* this._route.params.subscribe(params => {
       let search = params['search'];
       this.page_title = this.page_title;
       this.getPhotoSearch(search);
     });*/
    this.getPhoto();
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

  getPhoto() {
    let userId = this.identity._id;
    this._route.params.subscribe(params => {
      this.idAlbum = params['id'];
      //console.log(idAlbum);
      this._photoService.getPhotoByUser(userId).subscribe(
        response => {
          if (response.photo) {
            this.photo = response.photo;
          }
        },
        error => {
          console.log(error);

        }
      );

    });
  }

  addPhotoAlbum(id, id_album) {
     // this.idPhoto = id;
     // this.idAlbum = id_album;
      this.groupPhoto.photo = id;
      this.groupPhoto.album = id_album;

    //console.log('idPhoto:', this.idPhoto);
    //console.log('idAlbum:', this.idAlbum);
   // console.log('user:', this.identity._id);
    
    
    this._albumService.addPhotoAlbums(this.token, this.groupPhoto).subscribe(
      response => {
         if (response.album) {
          this.status = 'success';
          this.groupPhoto = response.groupPhoto;
          console.log(this.groupPhoto);
          
          //this._router.navigate(['panel/listAlbum']);
        } else {
          this.status = 'error';   
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
