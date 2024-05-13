import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryApiService } from '@app/infraestructure/driven-adapter/category-api-service';
import { CategoryInterface } from '@app/domain/models/category.interface';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private categoryApiService: CategoryApiService
  ) {}

  modeNew = false;

  categoryInterface: CategoryInterface = {
    categoryId: '0',
    name: '',
    description: '',
  };

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.modeNew = id === 'new';
    if (!this.modeNew && id) {
      this.categoryApiService
        .getCategoryById(id)
        .subscribe((categoryResponse: any) => {
          const category = categoryResponse.data;
          this.categoryInterface.categoryId = category.categoryId;
          this.categoryInterface.name = category.name;
          this.categoryInterface.description = category.description;
        });
    }
  }
  @Output()
  category = new EventEmitter<boolean>();

  save() {
    if (this.modeNew) {
      const categoryCreateInterface: CategoryInterface = {
        name: this.categoryInterface.name,
        description: this.categoryInterface.description,
      };

      this.categoryApiService
        .createCategory(categoryCreateInterface)
        .subscribe((categoryResponse: any) => {
          this.categoryInterface = categoryResponse.data;
          this.router.navigate(['/admin/categories']);
        });
    } else {
      const categoryInterface: CategoryInterface = {
        categoryId: this.categoryInterface.categoryId,
        name: this.categoryInterface.name,
        description: this.categoryInterface.description,
      };
      this.categoryApiService
        .updateCategory(categoryInterface)
        .subscribe((categoryResponse: any) => {
          this.categoryInterface = categoryResponse.data;
          this.router.navigate(['/admin/categories']);
        });
    }
  }
}
