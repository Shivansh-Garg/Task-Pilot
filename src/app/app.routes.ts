import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {SignupComponent} from './auth/components/signup/signup.component';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './modules/general/mainPage/front-page/front-page.component';
import { authGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  {path: '' , component : FrontPageComponent},
  {path: 'signup' , component : SignupComponent},
  {path: 'login' , component : LoginComponent},
  {path: 'admin',canActivate:[authGuard], loadChildren:()=>import("./modules/admin/admin.module").then(e => e.AdminModule)},
  {path: 'employee', canActivate:[authGuard], loadChildren:()=>import("./modules/employee/employee.module").then(e => e.EmployeeModule)},
  
  
];
