// import { Injectable, inject, signal } from '@angular/core';
// import { LocalStorageService } from '../../../shared/localstorage.service';
// import { environment } from '../../../../environments/environment';
// import {
//   BehaviorSubject,
//   Observable,
// } from 'rxjs';
// @Injectable({
//   providedIn: 'root',
// })
// export class UsersService {
//   private _users: BehaviorSubject<any[] | any> = new BehaviorSubject(null);
//   private _user: BehaviorSubject<any | any> = new BehaviorSubject(null);
//   private _profile: BehaviorSubject<any | any> = new BehaviorSubject(null);
//   private APIURL: string = environment.APIURL;
//   _LocalStorageService: LocalStorageService = inject(LocalStorageService);
//   constructor() { }
//   get users$(): Observable<any[]> {
//     return this._users.asObservable();
//   }
//   get user$() {
//     return this._user.asObservable();
//   }
//   get profile$() {
//     return this._profile.asObservable();
//   }
//   set accessToken(token: string) {
//     this._LocalStorageService.setItem('token', token);
//   }
//   get accessToken(): string {
//     return this._LocalStorageService.getItem('token') ?? '';
//   }
//   Profile = signal<any>({});
//   getUsers() {
//     return true
//     // return this._httpClient.get<any[]>(`${this.APIURL}/userss`).pipe(
//     //   tap((ves: any[]) => {
//     //     this._users.next(ves);
//     //   })
//     // );
//   }
//   getAdmin() {
//     // return this._httpClient.get<any[]>(`${this.APIURL}/userss/get/admin`).pipe(
//     //   tap((ves: any[]) => {
//     //       return ves
//     //   })
//     // );
//   }
//   async Dangky(user: any) {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       };
//       const response = await fetch(`${environment.APIURL}/userss/dangky`, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async getUserByid(id: any) {
//     console.log(id);
    
//     try {
//       const options = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await fetch(`${environment.APIURL}/users/findid/${id}`, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data);
      
//       return data
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   // updateUser(dulieu: any) {
//   //   // return this.users$.pipe(
//   //   //   take(1),
//   //   //   switchMap((Users: any) =>
//   //   //     this._httpClient.patch(`${this.APIURL}/userss/${dulieu.id}`, dulieu).pipe(
//   //   //       map((user:any) => {
//   //   //         const index = Users.findIndex((item: any) => item.id === user.id);
//   //   //         Users[index] = user;
//   //   //         this._users.next(Users);
//   //   //         return user;
//   //   //       })
//   //   //     )
//   //   //   )
//   //   // );
//   // }
//   updateOneUser(dulieu: any) {
//     // return this._httpClient.patch(`${this.APIURL}/userss/${dulieu.id}`, dulieu).pipe(
//     //   map((user:any) => {
//     //     this._profile.next(user);
//     //   })
//     // )
//   }
//   changepass(data: any) {
//     //  return this._httpClient.post(`${this.APIURL}/auth/changepass`, data).pipe(
//     //     tap((response: any) => {
//     //             return response;
//     //     })
//     // );
//   }
//   Randompass(data: any) {
//     //   return this._httpClient.post(`${this.APIURL}/auth/randompass`, data).pipe(
//     //      tap((response: any) => {
//     //              return response;
//     //      })
//     //  );
//   }
//   async getProfile() {
//     try {
//       const options = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${this.accessToken}`
//         },
//       };
//       const response = await fetch(`${environment.APIURL}/users/profile`, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       this.Profile.set(data);
//       this._profile.next(data);
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async getAllUser() {
//     try {
//       const options = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await fetch(`${environment.APIURL}/users`, options);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async getUserBySlug(Slug: any) {
//     try {
//       const options = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await fetch(`${environment.APIURL}/users/findslug/${Slug}`, options);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async SearchUser(SearchParams: any) {
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(SearchParams),
//       };
//       const response = await fetch(`${environment.APIURL}/users/search`, options);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async CreateUser(item: any) {
//     console.log(item);
//     try {
//       const options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(item),
//       };
//       const response = await fetch(`${environment.APIURL}/users/dangky`, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log(data);
      
//       return data
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async UpdateUser(item: any) {
//     try {
//       const options = {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(item),
//       };
//       const response = await fetch(`${environment.APIURL}/users/${item.id}`, options);
//       return await response.json();
//     } catch (error) {
//       return console.error(error);
//     }
//   }
//   async DeleteUser(item: any) {
//     try {
//       const options = {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const response = await fetch(`${environment.APIURL}/users/${item.id}`, options);
//       return await response.json();
//     } catch (error) {
//       return console.error(error);
//     }
//   }
// }
