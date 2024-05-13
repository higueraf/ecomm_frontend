import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInterface } from '@app/domain/models/category.interface';
import { GetListInterface } from '@app/domain/models/get-list.interface';
import { enviroment } from '@app/infraestructure/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  private BASE_URL: string = enviroment.API;

  constructor( private http: HttpClient) {}

  getCategories(getListInterface: GetListInterface): Observable<CategoryInterface>{
    return this.http.post<CategoryInterface>(this.BASE_URL+"/category", getListInterface);
  }
  getCategoryById(categoryId: string): Observable<CategoryInterface>{
    console.log('categoryId : ', categoryId);
    return this.http.get<CategoryInterface>(this.BASE_URL+"/category/"+categoryId);
  }
  createCategory(categoryInterface: CategoryInterface): Observable<CategoryInterface>{
    delete categoryInterface.categoryId;
    console.log('categoryId : ', categoryInterface);
    return this.http.post<CategoryInterface>(this.BASE_URL+"/category/create", categoryInterface);
  }
  updateCategory(categoryInterface: CategoryInterface): Observable<CategoryInterface>{
    return this.http.put<CategoryInterface>(this.BASE_URL+"/category/update/"+categoryInterface.categoryId, categoryInterface);
  }
  deleteCategory(categoryId: string): Observable<CategoryInterface>{
    return this.http.delete<CategoryInterface>(this.BASE_URL+"/category/delete/"+categoryId);
  }

}
