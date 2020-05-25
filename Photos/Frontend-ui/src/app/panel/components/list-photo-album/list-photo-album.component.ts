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
  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _photoService: PhotoService,
    private _albumService: AlbumService
  ) {
    this.page_title = 'list photo album ';
    this.identity = this._albumService.getIdentity();
    this.token = this._albumService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getPhotoAlbumById();
  }


  getPhotoAlbumById() {
    let userId = this.identity._id;
    this._route.params.subscribe(params => {
      this.idAlbum = params['id'];
      //console.log(idAlbum);
      this._albumService.getAlbumBy(this.idAlbum).subscribe(
        response => {
          if (response.groupPhoto == []) {
            console.log(this.status);
          } 
          if (response.groupPhoto.length > 0) {
            this.groupPhoto = response.groupPhoto;
            this.title = this.groupPhoto[0].album.name;
            this.page_title = 'list photo album ' + this.title;
           //console.log(this.groupPhoto); 
          }
        },
        error => {
          console.log(error);

        }
      );

    });
  }

  deletePhotoAlbum(id){
    this._albumService.deletePhotoAlbumById(this.token, id).subscribe(
      response => {
        
         //this._router.navigate(['panel/ListPhotoAlbum/'+response.album.album]);
         //this.getPhotoAlbumById();
        window.location.reload();
          //console.log(response);

          
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteAlbum(id){
    this._albumService.deleteAlbumById(this.token, id).subscribe(
      response => {
        this._router.navigate(['panel/listAlbum']);  
      },
      error => {
        console.log(error);
      }
    );
  }




}
