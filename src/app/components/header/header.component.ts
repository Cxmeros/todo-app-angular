import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './header.component.html',
  styles: '',
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl('');

  _stateService = inject(StateService);
  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value) => {
      console.log(value);
      this._stateService.searchTask.next(value || '');
    });
  }
}
