import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private URL = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  getConsultation() {
    return this.http.get(`${this.URL}/consultation`);
  }
  saveConsultation(body: any) {
    return this.http.post(`${this.URL}/consultation`, body);
  }


  getPhysicians() {
    return this.http.get(`${this.URL}/physicians`);
  }
  savePhysicians(body: any) {
    return this.http.post(`${this.URL}/physicians`, body);
  }

  updatePhysicians(id: any, data: any) {
    return this.http.put(`${this.URL}/physicians/${id}`, data);

  }


}
