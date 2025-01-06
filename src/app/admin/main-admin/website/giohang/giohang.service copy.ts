// import { Injectable, signal } from '@angular/core';
// import { environment } from '../../../../environments/environment';
// import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class GiohangService {
//   private _giohangs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
//   private _giohang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
//   private _Total: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
//   private _giohangs: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
//   get giohangs$(): Observable<any[] | null> {
//     return this._giohangs.asObservable();
//   }
//   get giohang$(): Observable<any| null> {
//     return this._giohang.asObservable();
//   }
//   get Total$(): Observable<any| null> {
//     return this._Total.asObservable();
//   }
//   constructor() {}
//   async getAllGiohang() {
//     try {
//       const options = {
//         method:'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//           const response = await fetch(`${environment.APIURL}/giohang`,options);
//           const data = await response.json();   
//           this._giohangs.next(data)               
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async SearchGiohang(SearchParams:any) {
//     try {
//       const options = {
//         method:'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(SearchParams),
//       };
//           const response = await fetch(`${environment.APIURL}/giohang/search`,options);
//           const data = await response.json();                  
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async CreateGiohang(item:any) {
//     console.log(item);
  
//     try {
//         const options = {
//             method:'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(item),
//           };
//           const response = await fetch(`${environment.APIURL}/giohang`, options);  
//           if (!response.ok) { // Check for non-2xx status codes
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();
//          this._giohang.next(data)              
//       } catch (error) {
//           return console.error(error);
//       }
//   }  
//   async UpdateGiohang(item:any) {
//     try {
//         const options = {
//             method:'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(item),
//           };
//           const response = await fetch(`${environment.APIURL}/giohang/${item.id}`, options);
//           return await response.json();         
//       } catch (error) {
//           return console.error(error);
//       }
//   }  
//   async DeleteGiohang(item:any) {
//     try {
//         const options = {
//             method:'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           };
//           const response = await fetch(`${environment.APIURL}/giohang/${item.id}`, options);
//           return await response.json();         
//       } catch (error) {
//           return console.error(error);
//       }
//   } 
// }

