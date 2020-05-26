import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;


  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Sing Up';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '', '');
  }

  ngOnInit() {
    //console.log(this._userService.test());
  }
  onSubmit(form) {
   // console.log(this.user);
    
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        //this.status = error.error.message;

      }
    );

  }

}