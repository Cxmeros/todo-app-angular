import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  searchTask: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {

   }
}
