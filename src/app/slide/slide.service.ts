import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private _slides: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _slide: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  get slides$(): Observable<any[] | null> {
    return this._slides.asObservable();
  }
  get slide$(): Observable<any | null> {
    return this._slide.asObservable();
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
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8/values/slide?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`,options);
    const data = await response.json();  
          //this._slides.next(data)                 
    return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getAllSlide() {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/slide`,options);
          const data = await response.json(); 
          this._slides.next(data)                 
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getSlideBySlug(Slug:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/slide/findslug/Slug`,options);
          const data = await response.json();    
          this._slide.next(data)                      
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getSlideByid(id:any) {
    try {
      const options = {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
          const response = await fetch(`${environment.APIURL}/slide/findid/id`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._slide.next(data)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async SearchSlide(SearchParams:any) {    
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/slide/search`,options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();   
          this._slides.next(data.items)              
          this._totalCount.next(data.totalCount)              
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async CreateSlide(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/slide`, options);          
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
  async SyncSlide(item:any) {
    try {
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/slide/sync`, options);          
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
  async UpdateSlide(item:any) {
    const slides:any = await this.slides$.pipe(take(1)).toPromise();
    try {
        const options = {
            method:'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          };
          const response = await fetch(`${environment.APIURL}/slide/${item.id}`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this._slide.next(data) 
          const updateSlides = slides.map((v:any) =>
            v.id === data.id ? data : v
          );
          this._slides.next(updateSlides);               
          return data;  
      } catch (error) {
          return console.error(error);
      }
  }  
  
  async DeleteSlide(item:any) {
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/slide/${item.id}`, options);
          return await response.json();         
      } catch (error) {
          return console.error(error);
      }
  }
}