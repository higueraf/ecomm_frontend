import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '@app/infraestructure/driven-adapter/product-api-service';
import { ProductInterface } from '@app/domain/models/product.interface';
import { CategoryApiService } from '@app/infraestructure/driven-adapter/category-api-service';
import { CategoryInterface } from '@app/domain/models/category.interface';
import { StickyDirection } from '@angular/cdk/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productApiService: ProductApiService,
    private categoryApiService: CategoryApiService,
  ) {}

  modeNew = false;
  requiredFileType:string = '';
  fileName = '';
  
  productInterface: ProductInterface = {
    productId: '0',
    code: '',
    name: '',
    description: '',
    stock: 0,
    image: null,
    price: 0,
    categoryId: '',
    iva: false,
  };
  categories: CategoryInterface[] = [];
  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.modeNew = id === 'new';
    if (!this.modeNew && id) {
      this.productApiService
        .getProductById(id)
        .subscribe((productResponse: any) => {
          const product = productResponse.data;
          this.productInterface.productId = product.productId;
          this.productInterface.name = product.name;
          this.productInterface.description = product.description;
        });

    }
    this.categoryApiService
    .getCategoriesSelect()
    .subscribe((categoryResponse: any) => {
      console.log("categoryResponse.data", categoryResponse.data);
      this.categories = categoryResponse.data;
    });
  }
  @Output()
  product = new EventEmitter<boolean>();
  changeCategoryId(value: string) {
    this.productInterface.categoryId = value;
  }
  onFileSelected(event: any) {
    
    this.productInterface.image = event.target.files[0];
    this.fileName = this.productInterface.image!.name;
  }
  save() {
    if (this.modeNew) {
      this.productApiService
        .createProduct(this.productInterface)
        .subscribe((productResponse: any) => {
          this.productInterface = productResponse.data;
          this.router.navigate(['/admin/products']);
        });
    } else {
      this.productApiService
        .updateProduct(this.productInterface)
        .subscribe((productResponse: any) => {
          this.productInterface = productResponse.data;
          this.router.navigate(['/admin/products']);
        });
    }
  }
  
  
}
