import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {SignupComponent} from './auth/components/signup/signup.component';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './modules/general/mainPage/front-page/front-page.component';

export const routes: Routes = [
  {path: 'signup' , component : SignupComponent},
  {path: 'login' , component : LoginComponent},
  {path: 'admin', loadChildren:()=>import("./modules/admin/admin.module").then(e => e.AdminModule)},
  {path: 'employee', loadChildren:()=>import("./modules/employee/employee.module").then(e => e.EmployeeModule)},
  {path:'dashboard', component: FrontPageComponent},
  
];
