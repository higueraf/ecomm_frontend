import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getProducts(getListInterface: GetListInterface): Observable<ProductInterface>{
    return this.http.post<ProductInterface>(this.BASE_URL+"/product", getListInterface);
  }
  getProductById(productId: string): Observable<ProductInterface>{
    console.log('productId : ', productId);
    return this.http.get<ProductInterface>(this.BASE_URL+"/product/"+productId);
  }
  createProduct(productInterface: ProductInterface): Observable<ProductInterface>{
    delete productInterface.productId;
    const headers = new HttpHeaders();
    const formData = new FormData();
    formData.append('image', productInterface.image!);
    formData.append('name', productInterface.name!);
    formData.append('description', productInterface.description!);
    formData.append('categoryId', productInterface.categoryId!);
    formData.append('stock', productInterface.stock?.toString()!);
    formData.append('price', productInterface.price?.toString()!);
    formData.append('iva', productInterface.iva ? 'true' : 'false');
    formData.append('state', '1');
    return this.http.post<ProductInterface>(this.BASE_URL+"/product/create", formData, { headers: headers });
  }
  updateProduct(productInterface: ProductInterface): Observable<ProductInterface>{
    return this.http.put<ProductInterface>(this.BASE_URL+"/product/update/"+productInterface.productId, productInterface);
  }
  deleteProduct(productId: string): Observable<ProductInterface>{
    return this.http.delete<ProductInterface>(this.BASE_URL+"/product/delete/"+productId);
  }

}
