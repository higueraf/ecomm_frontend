import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '@app/domain/models/user.interface';
import { UserApiService } from '@app/infraestructure/driven-adapter/user-api-service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private userApiService: UserApiService,
    ){}
  
    modeNew = false;

    userInterface: UserInterface = {
      userId: '',
      userName: '',
      email: '',
      password: '',
      rolId: '',  
    }
  
    ngOnInit() {
      const id = this.activeRoute.snapshot.paramMap.get('id');
      this.modeNew = (id === 'new');
      if (!this.modeNew && id) {
        this.userApiService.getUserById(id).subscribe((userResponse: any) => {
          this.userInterface.userId = userResponse.userId;
          this.userInterface.userName= userResponse.userName;
          this.userInterface.email = userResponse.email;
        });
      } 
    }
  @Output()
  event = new EventEmitter<boolean>();
  
  
  
  save() {
    if (this.modeNew) {
      const userInterface: UserInterface = {
        userName: this.userInterface.userName,
        email: this.userInterface.email,
        password: this.userInterface.password,
      }
      this.userApiService.createUser(userInterface).subscribe((userResponse: any) => {
        this.userInterface = userResponse.data;
        this.router.navigate(['/admin/users']);
      });
    } else {
      const userInterface: UserInterface = {
        userId: this.userInterface.userId,
        userName: this.userInterface.userName,
        email: this.userInterface.email,
        password: this.userInterface.password,
    
      }
      this.userApiService.updateUser(userInterface).subscribe((userResponse: any) => {
        this.userInterface = userResponse.data;
        this.router.navigate(['/admin/users']);
      });
    }
  }
  changeToRegister(){
    this.event.emit(false);
  }
}