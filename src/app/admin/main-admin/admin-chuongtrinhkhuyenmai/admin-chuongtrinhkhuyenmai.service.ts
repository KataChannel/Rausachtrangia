import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChuongtrinhkhuyenmaiAdminService {
  private _chuongtrinhkhuyenmaiadmins: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  private _chuongtrinhkhuyenmaiadmin: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  constructor() { }
  async getAllChuongtrinhkhuyenmaiAdmin() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getChuongtrinhkhuyenmaiByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai/findid/${id}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getChuongtrinhkhuyenmaiByCode(Code: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai/findcode/${Code}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  async SearchChuongtrinhkhuyenmaiAdmin(SearchParams: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai/search`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async GetLListTypeChuongtrinhkhuyenmai() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai/listtype`, options);
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
  async CreateChuongtrinhkhuyenmaiAdmin(item: any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async UpdateChuongtrinhkhuyenmaiAdmin(item: any) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai/${item.id}`, options);
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  }
  async DeleteChuongtrinhkhuyenmaiAdmin(item: any) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/chuongtrinhkhuyenmai/${item.id}`, options);
      return await response.json();
    } catch (error) {
      return console.error(error);
    }
  }
}

