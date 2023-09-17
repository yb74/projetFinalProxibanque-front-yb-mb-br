import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  private isFormVisible = new BehaviorSubject<boolean>(false);
  isFormVisible$ = this.isFormVisible.asObservable();

  public updateFormVisibility(newStatus: boolean) {
    this.isFormVisible.next(newStatus);
  }

}
