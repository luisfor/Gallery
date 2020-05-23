import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Photo } from '../../../models/photo';
import { UserService } from '../../../services/user.service';



@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService]
})
export class AddComponent implements OnInit {

  public page_title: string;
  public photo: Photo;
  public identity;
  public token;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.page_title = 'Add new Photo';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.photo = new Photo('','','','',this.identity._id,'');

  }

  ngOnInit(){
  }

  onSubmit(form){
    console.log(this.photo);
    
  }

}
