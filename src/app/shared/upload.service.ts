import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor() { }
  async DeleteuploadDriver(data: any) {
    console.log(data);
    try {
      const response = await fetch(environment.APIURL + `/upload/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' // Assuming the API expects JSON data
        },
        body: JSON.stringify(data) 
       }) 
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();         
      return result;
      } catch (error) {
          return console.error(error);
      }
    // return this.http.delete(environment.APIURL + `/upload/${data.id}`,{ body: data }).pipe(
    //   map((res: any) => {
    //     if (res) {
    //       console.log(res);
    //       return res;
    //     }
    //   })
    // );
  }
  async uploadDriver(file: any) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}_${month}_${year}`;
      const response = await fetch(environment.APIURL + `/upload/local?folder=${environment.pathServer}/${formattedDate}`, {
        method: 'POST',
        body: formData
       }) 
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();         
      return data;
      } catch (error) {
          return console.error(error);
      }

    // return this.http.post(environment.APIURL + `/upload/local?folder=${formattedDate}`, formData).pipe(
    //   map((data: any) => {
    //     if (data) {
    //       return data;
    //     }
    //   })
    // );
  }
  async uploadDonhang(file: any) {
    try {
      // const formData = new FormData();
      // formData.append('image', file);
      // console.log(formData);
      const response = await fetch(environment.APIURL + `/upload/image`, {
        method: 'POST',
        body: file
       }) 
       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();         
      return data;
      } catch (error) {
          return console.error(error);
      }

    // return this.http.post(environment.APIURL + `/upload/local?folder=${formattedDate}`, formData).pipe(
    //   map((data: any) => {
    //     if (data) {
    //       return data;
    //     }
    //   })
    // );
  }
}
