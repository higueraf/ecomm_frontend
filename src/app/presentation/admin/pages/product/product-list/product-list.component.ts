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
  currentPage = 1;
  recordsPerPage = 10;
  totalRecords = 0;
  categoriesList: ProductInterface[] = [];

  constructor(
    private router: Router,
    private productApiService: ProductApiService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  createProduct() {
    this.router.navigate(['/pages/categories/new']);
  }

  updateProduct(product: any) {
    this.router.navigate(['/pages/categories/' + product.productId]);
  }

  deleteProduct(product: any) {
    this.productApiService.deleteProduct(product.productId).subscribe(() => {
      this.getProducts();
    });
  }

  onPageChange(product: PageEvent) {
    this.currentPage = product.pageIndex + 1;
    this.recordsPerPage = product.pageSize;
    this.getProducts();
  }

  private getProducts() {
    const getListInterface: GetListInterface = {
      NumPage: this.currentPage,
      NumRecordsPage: this.recordsPerPage,
      Order: 'desc',
      Sort: 'ProductId',
    };

    this.productApiService.getCategories(getListInterface).subscribe((productResponse: any) => {
      this.categoriesList = productResponse.data.items;
      this.totalRecords = productResponse.data.totalRecords;
    });
  }
}
