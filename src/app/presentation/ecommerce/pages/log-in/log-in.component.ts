import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '@app/infraestructure/driven-adapter/user-api-service';
import { UserLoginRequestInterface } from '@app/domain/models/user-login-request.interface';
import { UserLoginResponseInterface } from '@app/domain/models/user-login-response.interface';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  providers: [Router]
})
export class LogInComponent {
  constructor(private router: Router, 
    private userApiService: UserApiService,
    private _snackBar: MatSnackBar
    ){}
  

  @Output()
  event = new EventEmitter<boolean>();
  
  userLoginResponseInterface: UserLoginResponseInterface = {
    email: '',
    userName: '',
    token: ''
  }
    userLoginRequestInterface: UserLoginRequestInterface = {
      Email: '',
      Password: ''
    };
  login(){
    
    this.userApiService.userLogin(this.userLoginRequestInterface).subscribe((loginResponse: any) => {
      this.userLoginResponseInterface = loginResponse.data;
      if (loginResponse.isSuccess){
        console.log("login", this.userLoginResponseInterface.token);
        localStorage.setItem('token', this.userLoginResponseInterface.token);
        localStorage.setItem('email', this.userLoginResponseInterface.email);
        localStorage.setItem('username', this.userLoginResponseInterface.userName);
        this.router.navigate(['/']);
        this._snackBar.open('Logueado exitosamente', '', {
          duration: 5000
        });
      } else {
        this._snackBar.open(loginResponse.message, '', {
          duration: 5000
        });
      }
      
    });
    
  }
  changeToRegister(){
    this.router.navigate(['/register']);
  }

}



