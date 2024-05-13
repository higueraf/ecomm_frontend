import { Component, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GetListInterface } from '@app/domain/models/get-list.interface';
import { UserInterface } from '@app/domain/models/user.interface';
import { UserApiService } from '@app/infraestructure/driven-adapter/user-api-service';





@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  currentPage = 1;
  recordsPerPage = 10;
  totalRecords = 0;
  usersList: UserInterface[] = [];

  constructor(
    private router: Router,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  createUser() {
    this.router.navigate(['/pages/users/new']);
  }

  updateUser(user: any) {
    this.router.navigate(['/pages/users/' + user.userID]);
  }

  deleteUser(user: any) {
    this.userApiService.deleteUser(user.userID).subscribe(() => {
      this.getUsers();
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.getUsers();
  }

  private getUsers() {
    const getListInterface: GetListInterface = {
      NumPage: this.currentPage,
      NumRecordsPage: this.recordsPerPage,
      Order: 'desc',
      Sort: 'UserId',
    };
    this.userApiService.getUsers(getListInterface).subscribe((userResponse: any) => {
      this.usersList = userResponse.data.items;
      this.totalRecords = userResponse.data.totalRecords;
    });
  }
}
