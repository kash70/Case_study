import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddtocartserviceService {

  constructor(private http:HttpClient) { }
  userid = 5;
  date = new Date();  
  postData(data:any){
    let pdata = {
      userid:this.userid,
      date : this.date,
      products:data
    }
    return this.http.post('https://fakestoreapi.com/carts',pdata);
  }
}
