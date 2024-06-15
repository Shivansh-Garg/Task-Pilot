import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [AngularMaterialModule,RouterLink],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {
    
}
