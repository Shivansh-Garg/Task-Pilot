
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';
import { AngularMaterialModule } from '../../../../angular-material.module';
import { TaskStatusService } from '../../services/task-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,AngularMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  listOfTasks: any = [];
  countOfTaskStatus: { [key: string]: number } = {
    PENDING: -1,
    INPROGRESS: -1,
    COMPLETED: -1,
    DEFERED: -1,
    CANCELLED: -1,
  };

  constructor(private service: EmployeeService,
    private taskStatus: TaskStatusService,
    private snackbar: MatSnackBar){
    this.getTaskStatusCount();
    this.getTasks();
  }

  getTasks(){
    this.service.getEmployeeTaskById().subscribe((res) => {
      console.log(res);
      this.listOfTasks = res;
    })
  }

  getTaskStatusCount(){
    this.service.getAllTaskCountByStatus().subscribe((res)=>{
      this.countOfTaskStatus = res;
      this.taskStatus.countOfTaskStatus = res;
    })
  }

  getTasksByStatusAndId(status: string){
    this.service.getAllTaskByStatusAndId(status).subscribe((res)=>{
      this.listOfTasks = res;
      console.log(this.listOfTasks);
    })
  }

  updateStatus(id: number, status: string){
    this.service.updateStatus(id,status).subscribe((res)=>{
      if(res.id!=null){
        this.snackbar.open("Task Status Updated Successfully","Close",{duration:3000});
        this.getTasks();
      }else{
        this.snackbar.open("Getting error while updating the task","Close",{duration:3000});
      }
      this.getTaskStatusCount();
    })
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
