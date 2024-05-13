import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderApiService } from '@app/infraestructure/driven-adapter/order-api-service';
import { OrderInterface } from '@app/domain/models/order.interface';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private orderApiService: OrderApiService
  ) {}

  modeNew = false;

  orderInterface: OrderInterface = {
    orderId: '0',
    clientId: '',
  };

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.modeNew = id === 'new';
    if (!this.modeNew && id) {
      this.orderApiService
        .getOrderById(id)
        .subscribe((orderResponse: any) => {
          const order = orderResponse.data;
          this.orderInterface.orderId = order.orderId;
          this.orderInterface.clientId = order.clientId;
          this.orderInterface.orderDate = order.orderDate;
        });
    }
  }
  @Output()
  order = new EventEmitter<boolean>();

  save() {
    if (this.modeNew) {
      const orderCreateInterface: OrderInterface = {
        clientId: this.orderInterface.clientId,
        orderDate: this.orderInterface.orderDate,
      };

      this.orderApiService
        .createOrder(orderCreateInterface)
        .subscribe((orderResponse: any) => {
          this.orderInterface = orderResponse.data;
          this.router.navigate(['/pages/categories']);
        });
    } else {
      const orderInterface: OrderInterface = {
        orderId: this.orderInterface.orderId,
        clientId: this.orderInterface.clientId,
        subTotal: this.orderInterface.subTotal,
      };
      this.orderApiService
        .updateOrder(orderInterface)
        .subscribe((orderResponse: any) => {
          this.orderInterface = orderResponse.data;
          this.router.navigate(['/pages/orders']);
        });
    }
  }
}
