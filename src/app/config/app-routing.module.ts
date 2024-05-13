import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@app/presentation/admin/admin.component';



const routes: Routes = [  
  { path:'',
    children: [
      { path: '',
        loadChildren: () => import('@app/presentation/ecommerce/ecommerce.module').then(m => m.EcommerceModule)
      },
      { path: 'admin',
        loadChildren: () => import('@app/presentation/admin/admin.module').then(m => m.AdminModule)
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }