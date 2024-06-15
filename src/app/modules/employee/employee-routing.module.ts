import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { ViewTaskDetailsComponent } from './view-task-details/view-task-details.component';
import { ChartComponent } from './components/chart/chart.component';
const routes: Routes = [
{path: "dashboard", component: DashboardComponent},
{path: "task-details/:id", component: ViewTaskDetailsComponent},
{path: "chart", component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
