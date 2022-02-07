import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AddProductServiceService {
  name = localStorage.getItem('fname');
  constructor(private http: HttpClient) {}

  postData(data: any) {
    console.log(data);
    return this.http.post('http://localhost:3000/products', data);
  }
}
