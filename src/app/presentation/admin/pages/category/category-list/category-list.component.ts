import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { GetListInterface } from '@app/domain/models/get-list.interface';
import { CategoryInterface } from '@app/domain/models/category.interface';
import { CategoryApiService } from '@app/infraestructure/driven-adapter/category-api-service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  getListInterface: GetListInterface = {
    NumPage: 1,
    NumRecordsPage: 10,
    Order: 'desc',
    Sort: 'CategoryId',
    NumFilter: 0
  };
  
  totalRecords = 0;
  categoriesList: CategoryInterface[] = [];

  constructor(
    private router: Router,
    private categoryApiService: CategoryApiService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  onSearch() {
    this.getListInterface.NumFilter = 1;
    this.getCategories();
  }
  
  createCategory() {
    this.router.navigate(['/admin/categories/new']);
  }

  updateCategory(category: any) {
    this.router.navigate(['/admin/categories/' + category.categoryId]);
  }

  deleteCategory(category: any) {
    this.categoryApiService.deleteCategory(category.categoryId).subscribe(() => {
      this.getCategories();
    });
  }

  onPageChange(event: PageEvent) {
    this.getListInterface.NumPage = event.pageIndex + 1;
    this.getListInterface.NumRecordsPage = event.pageSize;
    this.getCategories();
  }
  

  private getCategories() {
    this.categoryApiService.getCategories(this.getListInterface).subscribe((categoryResponse: any) => {
      this.categoriesList = categoryResponse.data;
      this.totalRecords = categoryResponse.totalRecords;
    });
  }
}
