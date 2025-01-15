import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map, Observable, of, switchMap, take } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MainService {
    private _mains: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
    private _visitors: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
    private _main: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    private _totalCount: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    get mains$(): Observable<any[] | null> {
        return this._mains.asObservable();
    }
    get visitors$(): Observable<any[] | null> {
        return this._visitors.asObservable();
    }
    get main$(): Observable<any | null> {
        return this._main.asObservable();
    }
    get totalCount$(): Observable<any | null> {
        return this._totalCount.asObservable();
    }
    constructor() {}
    async getDrive() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1VghpYpLVKug07LJm1-pdcpeQcEoh5VaCOgBvOfQ0-L8/values/main?key=AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc`, options);
            const data = await response.json();
            //this._mains.next(data)                 
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async getAllMain() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/main`, options);
            const data = await response.json();
            this._mains.next(data)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async getAllVisitor() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/visitor`, options);
            const data = await response.json();
         //   console.log(data);

            this._mains.next(data)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async getVisitor() {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/visitor/getvisitor`, options);
            const data = await response.json();
            this._mains.next(data)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async getIP() {
        try {
            const response = await fetch('https://geolocation-db.com/json/');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async CreateIP(item: any) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/visitor`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);
            return data
        } catch (error) {
            return console.error(error);
        }
    }


    async getMainBySlug(Slug: any) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/main/findslug/${Slug}`, options);
            const data = await response.json();
            this._main.next(data)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async getMainByid(id: any) {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/main/findid/${id}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._main.next(data)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async SearchMain(SearchParams: any) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SearchParams),
            };
            const response = await fetch(`${environment.APIURL}/main/search`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._mains.next(data.items)
            this._totalCount.next(data.totalCount)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async CreateMain(item: any) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/main`, options);
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
    async SyncMain(item: any) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/main/sync`, options);
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
    async UpdateMain(item: any) {
        const mains: any = await this.mains$.pipe(take(1)).toPromise();
        try {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/main/${item.id}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._main.next(data)
            const updateMains = mains.map((v: any) =>
                v.id === data.id ? data : v
            );
            this._mains.next(updateMains);
            return data;
        } catch (error) {
            return console.error(error);
        }
    }

    async DeleteMain(item: any) {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/main/${item.id}`, options);
            return await response.json();
        } catch (error) {
            return console.error(error);
        }
    }
}