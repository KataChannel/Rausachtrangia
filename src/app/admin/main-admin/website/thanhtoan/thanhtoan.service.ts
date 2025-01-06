import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ThanhtoanService {
  private _thanhtoans: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _thanhtoan: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() {}
  async getPhiship(to:any) {    
    const from = "119 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, TPHCM"
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${from}&destinations=${to}&key=Dph8tdiphuew12KNWnm1gkfBRQJo2x89sBDfgEn9GAY7LEzhhiyxrbodoGhBw3BF`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();  
          console.log(data);
          return data.rows[0].elements[0];         
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllThanhtoan() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/thanhtoan`,options);
          const data = await response.json();                  
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getThanhtoanByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/thanhtoan/findid/id`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();         
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getThanhtoanBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/thanhtoan/findslug/Slug`,options);
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
  async SearchThanhtoan(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/thanhtoan/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();                     
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async GetLListTypeThanhtoan() {    
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/thanhtoan/listtype`,options);
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
  async CreateThanhtoan(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/thanhtoan`, options);          
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
  async UpdateThanhtoan(item:any) {
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/thanhtoan/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }  
  async DeleteThanhtoan(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/thanhtoan/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  } 
}

