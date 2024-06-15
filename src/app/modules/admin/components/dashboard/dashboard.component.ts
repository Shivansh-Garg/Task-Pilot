import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskStatusService } from '../../services/task-status.service';
import { BaseChartDirective } from 'ng2-charts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule,BaseChartDirective,CanvasJSAngularChartsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  searchForm!: FormGroup;
  listOfTasks : any = [];
  countOfTaskStatus: { [key: string]: number } = {
    PENDING: -1,
    INPROGRESS: -1,
    COMPLETED: -1,
    DEFERED: -1,
    CANCELLED: -1,
  };
  

  constructor(private service:AdminService,
    private snackbar: MatSnackBar,
    private taskStatus: TaskStatusService,
    private fb: FormBuilder,
  ){

    this.getTaskStatusCount();
    this.getTasks();
    this.searchForm = this.fb.group({
      title : [null]
    })
  }

  getTasks(){
    this.service.getAllTasks().subscribe((res)=>{
      this.listOfTasks = res;
      console.log(this.listOfTasks);
    })
  }

  getTasksByStatus(status: string){
    this.service.getAllTaskByStatus(status).subscribe((res)=>{
      this.listOfTasks = res;
      console.log(this.listOfTasks);
    })
  }

  deleteTask(id: number){
    this.service.deleteTask(id).subscribe((res)=>{
      this.snackbar.open("Task deleted successfully","Close",{duration: 2000});
      this.getTasks();
      this.getTaskStatusCount();
    })
  }

  getTaskStatusCount(){
    this.service.getAllTaskCountByStatus().subscribe((res)=>{
      this.countOfTaskStatus = res;
      this.taskStatus.countOfTaskStatus = res;
    })
  }

  searchTask(){
    this.listOfTasks = [];
    const title = this.searchForm.get('title')!.value;
    console.log(title);
    if(title == ""){
      this.service.getAllTasks().subscribe(
        (res:any)=>{this.listOfTasks=res}
      )
      return
    }
    this.service.searchTask(title).subscribe((res)=>{
      console.log(res);
      this.listOfTasks = res;
    });
  }

  

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'orange';
      case 'INPROGRESS': return 'blue';
      case 'COMPLETED': return 'green';
      case 'DEFERED': return 'purple';
      case 'CANCELLED': return 'red';
      default: return '';
    }
  }

  
}
