import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TasksComponent } from '../../tasks/tasks.component';
import { StateService } from '../../../services/state.service';
import { Tarea } from '../../../models/task.model';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent, CommonModule, TasksComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent implements OnInit {
  newTask: string = '';
  httpService= inject(HttpService)
  taskList: Tarea[] = [];
  initialTaskList: Tarea[] = [];
  _stateService = inject(StateService);

  addTask(){
    console.log(this.newTask)
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = ''
      this.getAllTasks()
    })
  }

  getAllTasks(){
    this.httpService.getAllTasks().subscribe((data: any) => {
      this.initialTaskList = this.taskList = data.filter((task: any) => task.completed)
    })
  }

  onCompleted(task: Tarea){
    task.completed = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks()
    })
  }

  onImportant(task: Tarea){
    task.important = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks()
    })
  }

  ngOnInit(){
    this._stateService.searchTask.subscribe((value) => {
      if (value) {
        this.taskList = this.initialTaskList.filter((task: Tarea) =>
          task.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.taskList = this.initialTaskList;
      }
    });
    this.getAllTasks();
  }
}
