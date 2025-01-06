import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DanhmucService {
  private _danhmucs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _danhmuc: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get danhmucs$(): Observable<any[] | null> {
    return this._danhmucs.asObservable();
  }
  get danhmuc$(): Observable<any | null> {
    return this._danhmuc.asObservable();
  }
  constructor() {}
  async getAllDanhmuc() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/danhmuc`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          this._danhmucs.next(data)                
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getDanhmucByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/danhmuc/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();         
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchDanhmuc(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/danhmuc/search`,options);
          const data = await response.json();   
          this._danhmucs.next(data.items)               
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateDanhmuc(item:any) {
    console.log(item);
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/danhmuc`, options);          
          return await response.json();                  
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateDanhmuc(item:any) {
    const danhmucs:any = await this.danhmuc$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/danhmuc/${item.id}`, options);
          const data =  await response.json();   
          this._danhmuc.next(data) 
          const updatedanhmucs = danhmucs.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._danhmucs.next(updatedanhmucs);  
          return data
               
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteDanhmuc(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/danhmuc/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}

