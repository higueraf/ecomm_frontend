import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '@app/infraestructure/driven-adapter/product-api-service';
import { ProductInterface } from '@app/domain/models/product.interface';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productApiService: ProductApiService
  ) {}

  modeNew = false;

  productInterface: ProductInterface = {
    productId: '0',
    name: '',
    description: '',
  };

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
  }
  @Output()
  product = new EventEmitter<boolean>();

  save() {
    if (this.modeNew) {
      const productCreateInterface: ProductInterface = {
        name: this.productInterface.name,
        description: this.productInterface.description,
      };

      this.productApiService
        .createProduct(productCreateInterface)
        .subscribe((productResponse: any) => {
          this.productInterface = productResponse.data;
          this.router.navigate(['/pages/categories']);
        });
    } else {
      const productInterface: ProductInterface = {
        productId: this.productInterface.productId,
        name: this.productInterface.name,
        description: this.productInterface.description,
      };
      this.productApiService
        .updateProduct(productInterface)
        .subscribe((productResponse: any) => {
          this.productInterface = productResponse.data;
          this.router.navigate(['/pages/products']);
        });
    }
  }
}
