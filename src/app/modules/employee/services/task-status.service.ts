import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor() { }

  countOfTaskStatus: { [key: string]: number } = {
    PENDING: -1,
    INPROGRESS: -1,
    COMPLETED: -1,
    DEFERED: -1,
    CANCELLED: -1,
  };
}
