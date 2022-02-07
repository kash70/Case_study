import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadServiceService {
  baseApiUrl = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
    
  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(file:any):Observable<any> {
  
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
      console.log(formData);
        
      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl, formData)
  }
}
