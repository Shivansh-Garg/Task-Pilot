import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive ,Router} from '@angular/router';
import {AngularMaterialModule} from './angular-material.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StorageService} from './auth/services/storage/storage.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  AngularMaterialModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    title="Task Pilot";
    throw new Error('Method not implemented.');
  }
  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event=>{
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
