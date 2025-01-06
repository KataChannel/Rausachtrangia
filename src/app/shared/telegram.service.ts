import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TelegramService {
    async SendNoti(data: string): Promise<any> {
        const url = `https://api.telegram.org/bot${environment.telegram_api}/sendMessage?chat_id=${environment.telegram_group}&text=${data}&parse_mode=html`;
        try {
          const response = await fetch(url);
          // Check for successful response status code (typically 200)
          if (!response.ok) {
            throw new Error(`Telegram API request failed with status ${response.status}`);
          }
          const responseData = await response.json();
          console.log(responseData);
          
          return responseData;
        } catch (error) {
          console.error('Error sending notification:', error);
          throw error;
        }
      }
//   private _telegramadmins: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
//   private _telegramadmin: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
//   private _searchtelegramadmin: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
//   get telegramadmins$(): Observable<any[] | null> {
//     return this._telegramadmins.asObservable();
//   }
//   get telegramadmin$(): Observable<any | null> {
//     return this._telegramadmin.asObservable();
//   }
//   get searchtelegramadmin$(): Observable<any | null> {
//     return this._searchtelegramadmin.asObservable();
//   }
//   constructor() {}
//   async getAllTelegramAdmin() {
//     try {
//       const options = {
//         method:'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//           const response = await fetch(`${environment.APIURL}/telegram`,options);
//           const data = await response.json();                  
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async getTelegramByid(id:any) {
//     try {
//       const options = {
//         method:'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//           const response = await fetch(`${environment.APIURL}/telegram/findid/id`,options);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();         
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async getTelegramBySlug(Slug:any) {
//     try {
//       const options = {
//         method:'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//           const response = await fetch(`${environment.APIURL}/telegram/findslug/Slug`,options);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();   
//           console.log(data);
                
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async SearchTelegramAdmin(SearchParams:any) {
//     console.log(SearchParams);
    
//     try {
//       const options = {
//         method:'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(SearchParams),
//       };
//           const response = await fetch(`${environment.APIURL}/telegram/search`,options);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();                     
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async GetLListTypeTelegram() {    
//     try {
//       const options = {
//         method:'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//           const response = await fetch(`${environment.APIURL}/telegram/listtype`,options);
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();      
//           console.log(data);
                         
//           return data;
//       } catch (error) {
//           return console.error(error);
//       }
//   }
//   async CreateTelegramAdmin(item:any) {
//     try {
//         const options = {
//             method:'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(item),
//           };
//           const response = await fetch(`${environment.APIURL}/telegram`, options);          
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();   
//           console.log(data);
             
//           return data;            
//       } catch (error) {
//           return console.error(error);
//       }
//   }  
//   async UpdateTelegramAdmin(item:any) {
//     try {
//         const options = {
//             method:'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(item),
//           };
//           const response = await fetch(`${environment.APIURL}/telegram/${item.id}`, options);
//           return await response.json();         
//       } catch (error) {
//           return console.error(error);
//       }
//   }  
//   async DeleteTelegramAdmin(item:any) {
//     try {
//         const options = {
//             method:'DELETE',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           };
//           const response = await fetch(`${environment.APIURL}/telegram/${item.id}`, options);
//           return await response.json();         
//       } catch (error) {
//           return console.error(error);
//       }
//   } 
}

