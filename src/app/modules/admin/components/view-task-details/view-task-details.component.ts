import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-task-details',
  standalone: true,
  imports: [AngularMaterialModule,ReactiveFormsModule],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.css'
})
export class ViewTaskDetailsComponent {

  taskId:number = this.activatedRoute.snapshot.params["id"];
  taskData: any;
  commentForm!: FormGroup;
  listOfComments: any;

  constructor(private service:AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ){
    this.getAllComments();
  }

  ngOnInit(){
    this.getTaskById();
    this.commentForm = this.fb.group({
      content: [null,Validators.required]
    })
  }

  getTaskById(){
    this.service.getTaskById(this.taskId).subscribe((res)=>{
      this.taskData = res;
    })
  }

  getAllComments(){
    this.service.getAllComments(this.taskId).subscribe((res)=>{
      console.log(res);
      this.listOfComments = res;

    })
  }

  publishComment(){
    this.service.createComment(this.taskId,this.commentForm.get("content")?.value).subscribe((res)=>{
      if(res.id != null){
        this.snackbar.open("Comment posted successfully","Close",{duration:3000});
        this.getAllComments();
      }else{
        this.snackbar.open("Something went wrong","Close",{duration:3000});
      }
    })

  }
}
