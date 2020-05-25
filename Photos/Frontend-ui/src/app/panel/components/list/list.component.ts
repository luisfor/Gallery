import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Photo } from '../../../models/photo';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { global } from '../../../services/global';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, PhotoService]
})
export class ListComponent implements OnInit {

  public page_title: string;
  public photo: Photo;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _photoService: PhotoService
  ) {
    this.page_title = 'My Gallery';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;


  }

  ngOnInit() {
    this.getPhoto();
  }

  getPhoto() {
    let userId = this.identity._id;
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
  }

  deletePhoto(id){
    this._photoService.deletePhotoById(this.token, id).subscribe(
      response => {
        this.getPhoto();
      },
      error => {
        console.log(error);
      }
    );
  }

}
