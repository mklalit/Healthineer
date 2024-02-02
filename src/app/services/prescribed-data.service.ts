import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescribedDataService {

  private prescribedDataSubject = new BehaviorSubject<any>(null);


  constructor() { }

  setValue(value: any) {
    this.prescribedDataSubject.next(value);
  }

  getValue() {
    return this.prescribedDataSubject.asObservable();
  }
}
