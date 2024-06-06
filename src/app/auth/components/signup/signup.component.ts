import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators,ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AngularMaterialModule} from '../../../angular-material.module'
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
               ReactiveFormsModule,
               AngularMaterialModule,
               RouterLink
             ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword= true;

  constructor(private fb: FormBuilder,
  private authService: AuthService,
  private snackbar: MatSnackBar,
  private router: Router){
    this.signupForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    confirmPassword: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(){
    console.log(this.signupForm.value);
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;

    if(password !== confirmPassword){
      this.snackbar.open("Password do not match","Close",{duration : 3000, panelClass:"error-snackbar"});
      return ;
    }

    this.authService.signup(this.signupForm.value).subscribe((res)=>{
    console.log(res);
    if(res.id != null){
      this.snackbar.open("Signup Successfull ","Close",{duration: 3000});
      this.router.navigateByUrl("/login");
    }else{
      this.snackbar.open("Signup failed","Close",{duration : 3000, panelClass:"error-snackbar"});
    }
   })
  }
}
