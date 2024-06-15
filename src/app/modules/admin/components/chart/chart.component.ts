import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdminService } from '../../services/admin.service';
import { TaskStatusService } from '../../services/task-status.service';
import { forkJoin } from 'rxjs';

Chart.register(...registerables); 

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {

  countOfTaskStatus: { [key: string]: number } = {
    PENDING: -1,
    INPROGRESS: -1,
    COMPLETED: -1,
    DEFERED: -1,
    CANCELLED: -1,
  };

  xdata:any[] =  [];
  listOfEmployeesId: any[] = [];
  listofEmployeesName: any[] = [];
  listofCountofEmployeeProjects: any[] = [];
  listofCountofTaskStatus: any[] = [];
  listofTaskStatus: any[] = [];
  resultData: any;
  monthListData: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  monthList: any[] = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];

  constructor(private service:AdminService,
    private taskStatus: TaskStatusService
  ){
    
  }

  ngOnInit(): void{
    this.getTaskStatusCount();
    this.getUsers();
    this.getAllDueMonthsOfTasks();
  }

  getTaskStatusCount(){
    this.service.getAllTaskCountByStatus().subscribe((res)=>{
      this.countOfTaskStatus = res;
      this.listofCountofTaskStatus = Object.values(res);
      this.listofTaskStatus = Object.keys(res);
      this.RenderChart('doughnut',this.listofTaskStatus,this.listofCountofTaskStatus,'dougnutchart');
    })
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      this.listOfEmployeesId = res.map((employee: { id: any }) => employee.id);
      this.listofEmployeesName = res.map((employee: { name: any }) => employee.name);
  
      const taskObservables = this.listOfEmployeesId.map((userId) =>
        this.service.getTaskCountByUserId(userId)
      );
  
      forkJoin(taskObservables).subscribe((taskCounts: number[]) => {
        this.listofCountofEmployeeProjects = taskCounts;
        console.log(this.listofCountofEmployeeProjects);
        this.RenderChart('line', this.listofEmployeesName, this.listofCountofEmployeeProjects, 'linechart');
      });
    });
  }

  getAllDueMonthsOfTasks(){
    this.service.getAllTasks().subscribe((res) =>{
      console.log(res);
  
      for (const task of res) {
        const dueDateStr: string = task.dueDate;
        const dueDate: Date = new Date(dueDateStr);
        const month: number = dueDate.getMonth(); 
  
        this.monthListData[month]++;
      }
      this.RenderChart('bar',this.monthList,this.monthListData,'barchart');
    })
  }

  RenderChart(chartType: any, xData: any, yData: any, elementId: any) {
    const ctx = elementId;

    new Chart(elementId, {
        type: chartType,
        data: {
            labels: xData,
            datasets: [{
                label: 'No. of Tasks',
                data: yData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)', 
                    'rgba(75, 192, 192, 0.8)', 
                    'rgba(255, 205, 86, 0.8)', 
                    'rgba(54, 162, 235, 0.8)', 
                    'rgba(153, 102, 255, 0.8)' 
                ],
                borderWidth: 2
                
            }]
        },
        options: {
          scales: {
            x: {
                ticks: {
                    color: 'black', 
                    font: {
                        weight: 'bold'  
                    }
                }
            },
            y: {
                ticks: {
                    color: 'black',  
                    font: {
                        weight: 'bold'  
                    }
                }
            }
        },
            plugins: {
              legend: {
                  labels: {
                      color: 'black', 
                      font: {
                          weight: 'bold' 
                      }
                  }
              }
          }
        }
    });
}

}
