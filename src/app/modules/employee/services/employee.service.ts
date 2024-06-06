import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8081/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeTaskById():Observable<any>{
    return this.http.get(BASIC_URL + "api/employee/tasks",{
      headers: this.createAuthorizationHeader()
    })
  }

  updateStatus(id:number, status:string):Observable<any>{
    return this.http.get(BASIC_URL + `api/employee/task/${id}/${status}`,{
      headers: this.createAuthorizationHeader()
    })
  }

  getAllTaskCountByStatus(): Observable<any> {
    return this.http.get(BASIC_URL + "api/employee/task/count" , {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllTaskByStatusAndId(status: string): Observable<any> {
    return this.http.get(BASIC_URL + "api/employee/task/find/" + status , {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

  getAllComments(id: number):Observable<any>{
    return this.http.get(BASIC_URL + "api/employee/task/comment/" + id,{
      headers: this.createAuthorizationHeader()
    })
  }

  createComment(id: number, content: string): Observable<any> {
    const params={
      content:content
    }
    return this.http.post(BASIC_URL + "api/employee/task/comment/" + id, null,{
      params:params,
      headers: this.createAuthorizationHeader()
    })
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + "api/employee/task/" + id, {
      headers: this.createAuthorizationHeader()
    })
  }
}
