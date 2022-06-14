import { Injectable } from '@angular/core';
import { Task } from '../shared/Task';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  tasks: any = [{
    id: 1,
    taskname: 'Task1',
    student: 'Ahmed',
    date: new Date()
  }];

  isadded: Boolean = false
  addtoTaskList(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(taskId: number) {
    let taskIndex: any = this.tasks.findIndex((ele: any) => ele.id == taskId)
    this.tasks.splice(taskIndex, 1)
  }
  getTasks() {
    return this.tasks;
  }
  editTask(taskId: number, newData: any) {
    this.tasks.forEach((ele: any) => {
      if (ele.id == taskId) {
        ele.taskname = newData.taskname
        ele.date = newData.date
        ele.student = newData.student
      }
    });

  }


}
