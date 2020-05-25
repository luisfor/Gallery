import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Album } from '../../../models/album';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { AlbumService } from '../../../services/album.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.css'],
  providers: [UserService, PhotoService, AlbumService]
})
export class ListAlbumComponent implements OnInit {

  public page_title: string;
  public album: Array<Album>;
  public identity;
  public token;
  public status;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _photoService: PhotoService,
    private _albumService: AlbumService
  ) {
    this.page_title = 'My Albums';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.getAlbum();
  }

  getAlbum() {
    let userId = this.identity._id;
    this._albumService.getAlbumByUser(userId).subscribe(
      response => {
        if (response.album) {
          this.album = response.album;
        }
      },
      error => {
        console.log(error);

      }
    );
  }

  

}
