import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  private _sanphams: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _sanpham: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get sanphams$(): Observable<any[] | null> {
    return this._sanphams.asObservable();
  }
  get sanpham$(): Observable<any | null> {
    return this._sanpham.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  constructor() {}
  async getDrive() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1rCAjdZ22Y_btU9GmdMXX_UXP1iVPM1ByuIERrwcEzSg/values/Update?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
    const data = await response.json();  
          //this._sanphams.next(data)                           
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllSanpham() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/sanpham`,options);
          const data = await response.json(); 
          this._sanphams.next(data)                 
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getSanphamBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/sanpham/findslug/${Slug}`,options);
          const data = await response.json();    
          this._sanpham.next(data)                      
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getSanphamByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/sanpham/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._sanpham.next(data)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchSanpham(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/sanpham/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._sanphams.next(data.items)              
          this._totalCount.next(data.totalCount)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateSanpham(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/sanpham`, options);          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          console.log(data);
          
          return data                
      } catch (error) {
          return console.error(error);
      }
  }  
  async SyncSanpham(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/sanpham/sync`, options);          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          console.log(data);
          
          return data                
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateSanpham(item:any) {
    const sanphams:any = await this.sanphams$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/sanpham/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._sanpham.next(data) 
          const updateSanphams = sanphams.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._sanphams.next(updateSanphams);               
          return data;  
      } catch (error) {
          return console.error(error);
      }
  }  
  
  async DeleteSanpham(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/sanpham/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }
}