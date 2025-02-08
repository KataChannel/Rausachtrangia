import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/localstorage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonhangsService {
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
  ListDonhang = signal<any[]>([]);
  Donhang = signal<any>({});
  async getAllDonhang() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
      };
      const response = await fetch(`${environment.APIURL}/donhang`, options);
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
      this.ListDonhang.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async createDonhang(item:any) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+this._StorageService.getItem('token')
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(`${environment.APIURL}/donhang`, options);
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
      //this.ListDonhang.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async SearchDonhang(SearchParams:any) {
    try {
      const options = {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SearchParams),
      };
          const response = await fetch(`${environment.APIURL}/donhang/search`,options);
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
          this.ListDonhang.set(data.items)
          return data;
      } catch (error) {
          return console.error(error);
      }
  }
  async getDonhangByid(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/donhang/findid/${id}`, options);
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
      this.Donhang.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async getDonhangByidUser(id: any) {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`${environment.APIURL}/donhang/findbyuser/${id}`, options);
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
      this.Donhang.set(data)
      return data;
    } catch (error) {
      return console.error(error);
    }
  }
  async updateOneDonhang(dulieu: any) {
    try {
      const options = {
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dulieu),
        };
        const response = await fetch(`${environment.APIURL}/donhang/${dulieu.id}`, options);
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
        this.getAllDonhang()
        this.Donhang.set(data)
        return data;
    } catch (error) {
        return console.error(error);
    }
  }
  async DeleteDonhang(item:any) {    
    try {
        const options = {
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(`${environment.APIURL}/donhang/${item.id}`, options);
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
          this.getAllDonhang()
          return await response.json();
      } catch (error) {
          return console.error(error);
      }
  }



    async addToCart(item: any): Promise<void> {
      const Donhang = this._StorageService.getItem('Donhang')||{
        Giohangs:[],
        Khachhang:{
          Hoten:'',
          SDT:'',
          Email:''
        },
        Diachis:[],
        Vanchuyen:{
          Diachi:''
        },
        Thanhtoan:{Hinhthuc:'COD'},
        Khuyenmai:{}
      }
      Donhang.Giohangs = Donhang?.Giohangs?.length > 0 ? Donhang.Giohangs : [];
      console.log(Donhang);
      console.log(item);
      const existingItemIndex = Donhang?.Giohangs?.findIndex((v: any) => v.MaSP === item.MaSP);

      //  if (existingItemIndex !== -1) {
      //         Donhang.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
      //         Donhang.Giohangs[existingItemIndex].SLTT += Number(item.Soluong) * parseFloat(Number(item.khoiluong).toFixed(2));
      //   } else {
      //         item.SLTT = Number(item.khoiluong)
      //         Donhang.Giohangs.push(item);
      //   }


        if (existingItemIndex !== -1) {
          Donhang.Giohangs[existingItemIndex].Soluong += Number(item.Soluong);
          Donhang.Giohangs[existingItemIndex].SLTT += Number(item.Soluong) * parseFloat(Number(item.khoiluong).toFixed(2));
          Donhang.Giohangs[existingItemIndex].Tongtien = Donhang.Giohangs[existingItemIndex].SLTT*Donhang.Giohangs[existingItemIndex].GiaCoSo
      } else {
          item.SLTT = parseFloat(Number(item.khoiluong).toFixed(2))
          item.Tongtien = item.SLTT*item.GiaCoSo
          item.SLTG = 0
          item.TongtienG = 0
          item.SLTN = 0
          item.TongtienN = 0
          Donhang.Giohangs.push(item);
    }




        this._StorageService.setItem('Donhang', Donhang)
        this.Donhang.set(Donhang)
    }
    DonhangInit(){
      const Donhang = this._StorageService.getItem('Donhang')||
      {
        Giohangs:[],
        Khachhang:{
          Hoten:'',
          SDT:'',
          Email:''
        },
        Diachis:[],
        Vanchuyen:{
          Diachi:''
        },
        Thanhtoan:{Hinhthuc:'COD'},
        Khuyenmai:{}
      }
      
      this.Donhang.set(Donhang)
    }
    async UpdateDonhang(item: any): Promise<void> {
        this._StorageService.setItem('Donhang', item)
        this.Donhang.set(item)
    }
    async ClearDonhang(): Promise<void> {
        this._StorageService.removeItem('Donhang')
        this.Donhang.set({})
    }

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
            // console.log(data);
            return data.rows[0].elements[0];         
        } catch (error) {
            return console.error(error);
        }
    }

    async getDrive(DriveInfo:any) {
      try {
        const options = {
          method:'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DriveInfo.IdSheet}/values/${DriveInfo.SheetName}?key=${DriveInfo.ApiKey}`,options);
      const data = await response.json();
     // console.log(data);
      return data;
        } catch (error) {
            return console.error(error);
        }
    }
    
}
