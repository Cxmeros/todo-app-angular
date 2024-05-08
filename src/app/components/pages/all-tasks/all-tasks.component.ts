import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TasksComponent } from '../../tasks/tasks.component';
import { StateService } from '../../../services/state.service';
import { Task } from 'zone.js/lib/zone-impl';
import { Tarea } from '../../../models/task.model';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule, PageTitleComponent, TasksComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent implements OnInit {
  newTask: string = '';
  httpService = inject(HttpService);
  initialTaskList: Tarea[] = [];
  taskList: Tarea[] = [];
  _stateService = inject(StateService);

  addTask() {
    console.log(this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = '';
      this.getAllTasks();
    });
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((data: any) => {
      console.log(data);
      this.initialTaskList = this.taskList = data;
    });
  }

  onCompleted(task: Tarea) {
    if (task.completed) {
      task.completed = false;
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks();
      });
      return;
    } else {
      task.completed = true;
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks();
      });
    }
  }

  onImportant(task: Tarea) {
    if (task.important) {
      task.important = false;
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks();
      });
      return;
    } else {
      task.important = true;
      this.httpService.updateTask(task).subscribe(() => {
        this.getAllTasks();
      });
    }
  }

  ngOnInit() {
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
