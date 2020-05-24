import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Album } from '../../../models/album';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { AlbumService } from '../../../services/album.service';
import { global } from '../../../services/global';

@Component({
  selector: 'addalbum',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
  providers: [UserService, PhotoService, AlbumService]
})
export class AddAlbumComponent implements OnInit {
  public page_title: string;
  public album: Album;
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
    this.page_title = 'Add new Album';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.album = new Album('', '', this.identity._id, '', '');
    this.url = global.url;
  }



  ngOnInit() {
    //console.log(this._albumService.test());
    
  }

  onSubmit(form) {
   this._albumService.addAlbum(this.token, this.album).subscribe(
     response => {
        if (response.album) {
          this.status = 'success';
          this.album = response.album;
          this._router.navigate(['panel/listAlbum']);
        } else {
          this.status = 'error';   
        }
     },
     error => {
       this.status = 'error';
       console.log(error);
       
     }
   );

  }

}
