import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LogInAdminComponent } from './pages/log-in-admin/log-in-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [  
  //{ path: '', pathMatch: 'full', redirectTo: 'login' },
  { path:'login', component: LogInAdminComponent },
  { path:'', component: AdminComponent,
    children: [
      { path:'dashboard', component: DashboardComponent},
      { path: 'categories',
        loadChildren: () => import('@app/presentation/admin/pages/category/category.module').then(m => m.CategoryModule)
      },
      { path: 'products',
        loadChildren: () => import('@app/presentation/admin/pages/product/product.module').then(m => m.ProductModule)
      },
      { path: 'orders',
        loadChildren: () => import('@app/presentation/admin/pages/order/order.module').then(m => m.OrderModule)
      },
      { path: 'users',
        loadChildren: () => import('@app/presentation/admin/pages/user/user.module').then(m => m.UserModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
