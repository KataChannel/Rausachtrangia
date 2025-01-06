import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsergroupService {
  private _usergroups: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _usergroup: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _searchusergroup: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get usergroups$(): Observable<any[] | null> {
    return this._usergroups.asObservable();
  }
  get usergroup$(): Observable<any | null> {
    return this._usergroup.asObservable();
  }
  get searchusergroup$(): Observable<any | null> {
    return this._searchusergroup.asObservable();
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
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1rCAjdZ22Y_btU9GmdMXX_UXP1iVPM1ByuIERrwcEzSg/values/SẢN PHẨM?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
    const data = await response.json();  
          //this._sanphams.next(data)                 
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllUsergroup() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/usergroup`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getUsergroupByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/usergroup/findid/${id}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._usergroup.next(data)        
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getUsergroupBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/usergroup/findslug/${Slug}`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._usergroup.next(data)                
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchUsergroup(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/usergroup/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          console.log(data);
           
          this._usergroups.next(data.items)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async GetLListTypeUsergroup() {    
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/usergroup/listtype`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();      
          console.log(data);
    this._usergroups.next(data)       
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateUsergroup(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/usergroup`, options);          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          console.log(data);
             
          return data;            
      } catch (error) {
          return console.error(error);
      }
  }  
  async UpdateUsergroup(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/usergroup/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteUsergroup(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/usergroup/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}

