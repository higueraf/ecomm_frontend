import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { GetListInterface } from '@app/domain/models/get-list.interface';
import { ProductInterface } from '@app/domain/models/product.interface';
import { ProductApiService } from '@app/infraestructure/driven-adapter/product-api-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  getListInterface: GetListInterface = {
    NumPage: 1,
    NumRecordsPage: 10,
    Order: 'desc',
    Sort: 'ProductId',
    NumFilter: 0
  };
  
  totalRecords = 0;
  productsList: ProductInterface[] = [];

  constructor(
    private router: Router,
    private productApiService: ProductApiService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  onSearch(event: any) {
    console.log('onsearch ', event);
    this.getListInterface.NumFilter = 1;
    this.getCategories();
  }

  createProduct() {
    this.router.navigate(['/admin/products/new']);
  }

  updateProduct(product: any) {
    this.router.navigate(['/admin/products/' + product.productId]);
  }

  deleteProduct(product: any) {
    this.productApiService.deleteProduct(product.productId).subscribe(() => {
      this.getCategories();
    });
  }

  onPageChange(event: PageEvent) {
    this.getListInterface.NumPage = event.pageIndex + 1;
    this.getListInterface.NumRecordsPage = event.pageSize;
    this.getCategories();
  }

  private getCategories() {
    this.productApiService.getProducts(this.getListInterface).subscribe((productResponse: any) => {
      this.productsList = productResponse.data;
      this.totalRecords = productResponse.totalRecords;
    });
  }
}
