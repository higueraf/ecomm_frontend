import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInterface } from '../../domain/models/order.interface';
import { GetListInterface } from '../../domain/models/get-list.interface';
import { enviroment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  private BASE_URL: string = enviroment.API;

  constructor( private http: HttpClient) {}

  getCategories(getListInterface: GetListInterface): Observable<OrderInterface>{
    return this.http.post<OrderInterface>(this.BASE_URL+"/order", getListInterface);
  }
  getOrderById(orderId: string): Observable<OrderInterface>{
    console.log('orderId : ', orderId);
    return this.http.get<OrderInterface>(this.BASE_URL+"/order/"+orderId);
  }
  createOrder(orderInterface: OrderInterface): Observable<OrderInterface>{
    delete orderInterface.orderId;
    return this.http.post<OrderInterface>(this.BASE_URL+"/order/", orderInterface);
  }
  updateOrder(orderInterface: OrderInterface): Observable<OrderInterface>{
    return this.http.put<OrderInterface>(this.BASE_URL+"/order/update/"+orderInterface.orderId, orderInterface);
  }
  deleteOrder(orderId: string): Observable<OrderInterface>{
    return this.http.delete<OrderInterface>(this.BASE_URL+"/order/delete/"+orderId);
  }

}
