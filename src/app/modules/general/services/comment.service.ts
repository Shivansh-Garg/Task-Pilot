import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8081/";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
   
  constructor(private http: HttpClient) {}

  /*createComment(taskId: number, content: string): Observable<any> {
    const url = `${this.BASIC_URL}api/admin/task/comment/${taskId}`;
    const body = { content }; 

    return this.http.post(url, body);
  }*/

  createComment(taskId: number, content: string): Observable<any> {
    return this.http.post(BASIC_URL + "api/admin/task/comment/" + taskId, content,{
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }
}
