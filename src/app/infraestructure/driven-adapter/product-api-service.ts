import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../../domain/models/product.interface';
import { GetListInterface } from '../../domain/models/get-list.interface';
import { enviroment } from '../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private BASE_URL: string = enviroment.API;

  constructor( private http: HttpClient) {}

  getCategories(getListInterface: GetListInterface): Observable<ProductInterface>{
    return this.http.post<ProductInterface>(this.BASE_URL+"/product", getListInterface);
  }
  getProductById(productId: string): Observable<ProductInterface>{
    console.log('productId : ', productId);
    return this.http.get<ProductInterface>(this.BASE_URL+"/product/"+productId);
  }
  createProduct(productInterface: ProductInterface): Observable<ProductInterface>{
    delete productInterface.productId;
    return this.http.post<ProductInterface>(this.BASE_URL+"/product/", productInterface);
  }
  updateProduct(productInterface: ProductInterface): Observable<ProductInterface>{
    return this.http.put<ProductInterface>(this.BASE_URL+"/product/update/"+productInterface.productId, productInterface);
  }
  deleteProduct(productId: string): Observable<ProductInterface>{
    return this.http.delete<ProductInterface>(this.BASE_URL+"/product/delete/"+productId);
  }

}
