import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Photo } from '../../../models/photo';
import { UserService } from '../../../services/user.service';
import { PhotoService } from '../../../services/photo.service';
import { global } from '../../../services/global';



@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, PhotoService]
})
export class AddComponent implements OnInit {

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
    this.page_title = 'Add new Photo';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.photo = new Photo('', '', '', '', this.identity._id, '');
    this.url = global.url;


    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .jpeg, .png, .git",
      maxSize: "50",
      uploadAPI: {
        url: this.url + "upload-photo",
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false, replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Upload Photo',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !'
      }
    };

  }

  photoUpload(data) {
    let data_obj = JSON.parse(data.response);
    this.photo.image = data_obj.image;
  }

  ngOnInit() {
    console.log(this._photoService.test());

  }

  onSubmit(form) {
    //console.log(this.photo);
    this._photoService.addPhoto(this.token, this.photo).subscribe(
      response => {
        if (response.photo) {
          this.status = 'success',
            this.photo = response.photo;
          this._router.navigate(['/panel']);
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
