import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuanlykhosService {
  private _authenticated: boolean = false;
  private APIURL: string = environment.APIURL;
  private isBrowser: boolean;
  constructor(
    private _StorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ListQuanlykho = signal<any[]>([]);
  Quanlykho = signal<any>({});
  async CreateQuanlykho(dulieu: any) {
    try {
      const options = {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/quanlykho`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getAllQuanlykho()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }

  async getAllQuanlykho() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/quanlykho`, options);
      if (!response.ok) {
        if (response.status === 401) {
          const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 403) {
          const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 500) {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        } else {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        }
      }
      const data = await response.json();     
      this.ListQuanlykho.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchQuanlykho(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/setting/search`,options);
          if (!response.ok) {
            if (response.status === 401) {
              const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
              // this.Dangxuat()
            } else if (response.status === 403) {
              const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
              // this.Dangxuat()
            } else if (response.status === 500) {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
              // this.Dangxuat()
            } else {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            }
          }
          const data = await response.json();
          this.Quanlykho.set(data.items)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getQuanlykhoByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/quanlykho/findid/${id}`, options);
      if (!response.ok) {
        if (response.status === 401) {
          const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 403) {
          const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else if (response.status === 500) {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          // this.Dangxuat()
        } else {
          const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
          this.router.navigate(['/errorserver'], { queryParams: {data:result}});
        }
      }
      const data = await response.json();
      this.Quanlykho.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async updateOneQuanlykho(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/quanlykho/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 403) {
            const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else if (response.status === 500) {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            // this.Dangxuat()
          } else {
            const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
            this.router.navigate(['/errorserver'], { queryParams: {data:result}});
          }
        }
        this.getAllQuanlykho()
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteQuanlykho(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/quanlykho/${item.id}`, options);
          if (!response.ok) {
            if (response.status === 401) {
              const result  = JSON.stringify({ code:response.status,title:'Vui lòng đăng nhập lại' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 403) {
              const result  = JSON.stringify({ code:response.status,title:'Bạn không có quyền truy cập' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else if (response.status === 500) {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi máy chủ, vui lòng thử lại sau' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            } else {
              const result  = JSON.stringify({ code:response.status,title:'Lỗi không xác định' })
              this.router.navigate(['/errorserver'], { queryParams: {data:result}});
            }
          }
          this.getAllQuanlykho()
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }
}