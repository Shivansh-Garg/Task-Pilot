import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularMaterialModule} from '../../../angular-material.module'
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
   CommonModule,
   AngularMaterialModule,
   ReactiveFormsModule,
   RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword= true;
  loginError = false;

    constructor(private fb: FormBuilder,
      private authService: AuthService,
      private snackbar: MatSnackBar,
      private router: Router){
      this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
      });
    }

    togglePasswordVisibility(){
      this.hidePassword = !this.hidePassword;
    }

    onSubmit(){
      console.log(this.loginForm.invalid);
      if (this.loginForm.invalid) {
        this.snackbar.open("Invalid Credentials","Close",{duration : 3000, panelClass:"error-snackbar"});
          return; 
      }
      console.log(this.loginForm.value);
      
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          if (res.userId !== null) {
            const user = {
              id: res.userId,
              role: res.userRole,
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);
      
            if (StorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl("/admin/dashboard");
            } else if (StorageService.isEmployeeLoggedIn()) {
              this.router.navigateByUrl("/employee/dashboard");
            }
            this.snackbar.open("Login Successful", "Close", { duration: 3000 });
          } else {
            this.loginError = true;
            console.log(this.loginError);
            this.snackbar.open("Invalid Credentials", "Close", { duration: 3000, panelClass: "error-snackbar" });
          }
        },
        (error) => {
          this.snackbar.open("Invalid Credentials", "Close", { duration: 3000, panelClass: "error-snackbar" });
        }
      );
    }
}
