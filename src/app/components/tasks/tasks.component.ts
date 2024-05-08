import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() completed = new EventEmitter<any>();

  markImportant(task: any){
    this.important.emit(task);
  }

  markCompleted(task: any){
    this.completed.emit(task);
  }
}
