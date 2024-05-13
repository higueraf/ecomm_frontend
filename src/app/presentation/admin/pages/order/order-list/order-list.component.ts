import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material/paginator';
import { GetListInterface } from '@app/domain/models/get-list.interface';
import { OrderInterface } from '@app/domain/models/order.interface';
import { OrderApiService } from '@app/infraestructure/driven-adapter/order-api-service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  currentPage = 1;
  recordsPerPage = 10;
  totalRecords = 0;
  categoriesList: OrderInterface[] = [];

  constructor(
    private router: Router,
    private orderApiService: OrderApiService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  createOrder() {
    this.router.navigate(['/pages/categories/new']);
  }

  updateOrder(order: any) {
    this.router.navigate(['/pages/categories/' + order.orderId]);
  }

  deleteOrder(order: any) {
    this.orderApiService.deleteOrder(order.orderId).subscribe(() => {
      this.getOrders();
    });
  }

  onPageChange(order: PageEvent) {
    this.currentPage = order.pageIndex + 1;
    this.recordsPerPage = order.pageSize;
    this.getOrders();
  }

  private getOrders() {
    const getListInterface: GetListInterface = {
      NumPage: this.currentPage,
      NumRecordsPage: this.recordsPerPage,
      Order: 'desc',
      Sort: 'OrderId',
    };

    this.orderApiService.getCategories(getListInterface).subscribe((orderResponse: any) => {
      this.categoriesList = orderResponse.data.items;
      this.totalRecords = orderResponse.data.totalRecords;
    });
  }
}
