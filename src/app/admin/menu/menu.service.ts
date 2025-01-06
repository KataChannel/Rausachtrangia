import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _menus: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _menu: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get menus$(): Observable<any[] | null> {
    return this._menus.asObservable();
  }
  get menu$(): Observable<any | null> {
    return this._menu.asObservable();
  }
  get totalCount$(): Observable<any | null> {
    return this._totalCount.asObservable();
  }
  SPREADSHEET_ID:any="1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8"
  SPREADSHEET_APIKEY:any="AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc"
  constructor() {}
  async getDrive() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/Menu?key=${this.SPREADSHEET_APIKEY}`,options);
    const data = await response.json();  
          //this._menus.next(data)                 
    return data;
      } catch (error) {
          return console.error(error);
      }
  }

  async getAllMenu() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/menu`,options);
          const data = await response.json(); 
          this._menus.next(data)                 
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMenuBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/menu/findslug/${Slug}`,options);
          const data = await response.json();    
          this._menu.next(data)                      
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getMenuByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/menu/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._menu.next(data)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchMenu(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/menu/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._menus.next(data.items)              
          this._totalCount.next(data.totalCount)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateMenu(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/menu`, options);          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          return data                
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateMenu(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/menu/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();     
          this._menu.next(data)                       
          return data;  
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteMenu(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/menu/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }
}
 