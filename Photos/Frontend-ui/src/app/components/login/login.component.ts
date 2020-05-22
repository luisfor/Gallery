import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
    this.page_title = 'Sign Up';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {

          //saving the user in a property to later save it in the local storage
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //get the token of the logged in user
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (response.token) {
                //saving the token in a property to later save it in the local storage
                this.token = response.token;
                localStorage.setItem('token', JSON.stringify(this.token));

                this.status = 'success';
                this._router.navigate(['/home']);
                
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);

            });

        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);

      });

  }

}
