import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap, take } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LocalStorageService } from '../../../../shared/localstorage.service';
import { genMaDonhang } from '../../../../shared/shared.utils';
@Injectable({
    providedIn: 'root'
})
export class GiohangService {
    _LocalStorageService: LocalStorageService = inject(LocalStorageService)
    private _giohang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    private _donhang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    private _addonhangs: BehaviorSubject<any[] | []> = new BehaviorSubject<any | null>(null);
    private _addonhang: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    // Giohangs: any  = this._LocalStorageService.getItem('Giohang')||[]
    Donhang: any = this._LocalStorageService.getItem('Donhang') || { Giohangs: { Sanpham: [] }, Khachhang: {}, Thanhtoan: {}, Vanchuyen: { Phivanchuyen: 0 } }
    get addonhangs$(): Observable<any[] | null> {
        return this._addonhangs.asObservable();
    }
    get addonhang$(): Observable<any | null> {
        return this._addonhang.asObservable();
    }
    get giohang$(): Observable<any[] | null> {
        return this._giohang.asObservable();
    }
    get donhang$(): Observable<any | null> {
        return this._donhang.asObservable();
    }
    async getSoluongDon(): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/getSoluong`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data[1]
        } catch (error) {
            return console.error(error);
        }
    }
    async getGiohangs(): Promise<any> {
        //  this._giohang.next(this.Giohangs)
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/giohang`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // this._giohang.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getGiohangByUser(id: any): Promise<any> {
        // this._giohang.next(this.Giohangs)
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/giohang/findUser/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._giohang.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getAdDonhangs(): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._addonhangs.next(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getAdDonhangByid(id: any): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/findid/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.DonHangAdmin(data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhangByid(id: any): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/findid/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._donhang.next(data)
            this._LocalStorageService.setItem('Donhang', data)
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhangByMaDonHang(MaDonHang: any): Promise<any> {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/findmadonhang/${MaDonHang}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this._donhang.next(data)
            return data
        } catch (error) {
            return console.error(error);
        }
    }
    async getDonhangByUser(id: any): Promise<any> {
        this._donhang.next(this.Donhang)
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(`${environment.APIURL}/donhang/findUser/${id}`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            return console.error(error);
        }
    }
    async UpdateGiamgia(item: any): Promise<any> {
        this._donhang.next(item)
        this.getDonhang()
    }
    async CreateDonhang(item: any) {
        item.Giohangs.Sanpham = item.Giohangs.Sanpham.map((v: any) => ({
            id: v.id,
            id_cat: v.id_cat,
            Title: v.Title,
            Danhmuc: v.Danhmuc,
            Slug: v.Slug,
            Giachon: v.Giachon,
            Giagoc: v.Giagoc,
            Image: v.Image,
            Soluong: v.Soluong
        }))
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/donhang`, options);
            if (!response.ok) { // Check for non-2xx status codes
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            return data
        } catch (error) {
            return console.error(error);
        }
    }

    async UpdateDonhang(item: any): Promise<any> {
        console.log(item);
        try {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/donhang/${item.id}`, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            this._donhang.next(data)
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    async DeleteDonhang(item: any) {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            };
            const response = await fetch(`${environment.APIURL}/donhang/${item.id}`, options);
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
    async addToCart(item: any): Promise<void> {
        console.log(item);

        if (!this.Donhang.hasOwnProperty('MaDonHang')) {
            this.Donhang.Khachhang = { Hoten: '' }
            this.Donhang.Thanhtoan = {}
            this.Donhang.Vanchuyen = { Phivanchuyen: 0 }
            this.Donhang.Status = 0
            this.Donhang.Giohangs.Sanpham = [item]
            await this.getDonhang()
            this._LocalStorageService.setItem('Donhang', this.Donhang)
            this._donhang.next(this.Donhang)
        }
        else {
            const existingItemIndex = this.Donhang.Giohangs.Sanpham.findIndex((v: any) => v.id === item.id && v.Giachon?.id == item?.Giachon?.id);
            console.log(existingItemIndex);
            if (existingItemIndex !== -1) {
                this.Donhang.Giohangs.Sanpham[existingItemIndex].Soluong += Number(item.Soluong);
                this.Donhang.Giohangs.Sanpham[existingItemIndex].Giachon.SLTT += (Number(item.Soluong) * Number(item.Giachon.khoiluong)).toFixed(2);
            } else {
                this.Donhang.Giohangs.Sanpham.push(item);
            }
            await this.getDonhang()
            this._LocalStorageService.setItem('Donhang', this.Donhang)
            this._donhang.next(this.Donhang)
        }
    }
    async Crement(item: any) {
        console.log(item);

        if (!this.Donhang.hasOwnProperty('MaDonHang')) {
            this.Donhang.Khachhang = { Hoten: '' }
            this.Donhang.Thanhtoan = {}
            this.Donhang.Vanchuyen = { Phivanchuyen: 0 }
            this.Donhang.Status = 0
            this.Donhang.Giohangs.Sanpham = [item]
            this.getDonhang()
        }
        else {
            const existingItemIndex = this.Donhang.Giohangs.Sanpham.findIndex((v: any) => v.id === item.id && v.Giachon?.id == item?.Giachon?.id);
            if (existingItemIndex !== -1) {
                this.Donhang.Giohangs.Sanpham[existingItemIndex].Soluong = Number(item.Soluong);
                this.Donhang.Giohangs.Sanpham[existingItemIndex].Giachon.SLTT = (Number(item.Soluong) * Number(item.Giachon.khoiluong)).toFixed(2);
            } else {
                this.Donhang.Giohangs.Sanpham.push(item);
            }
            this.getDonhang()
            // this._LocalStorageService.setItem('Donhang', this.Donhang)
            // this._donhang.next(this.Donhang)
        }
    }

    async removeFromCart(item: any): Promise<void> {
        const existingItemIndex = this.Donhang.Giohangs.Sanpham.findIndex((v: any) => v.id === item.id && v.Giachon?.id == item?.Giachon?.id);
        if (existingItemIndex !== -1) {
            this.Donhang.Giohangs.Sanpham.splice(existingItemIndex, 1);
        }
        this._LocalStorageService.setItem('Donhang', this.Donhang)
        this._donhang.next(this.Donhang)
    }
    async clearCart(): Promise<void> {
        this._donhang.next({ Giohangs: { Sanpham: [] }, Khachhang: {}, Thanhtoan: {}, Vanchuyen: { Phivanchuyen: 0 } })
        this._LocalStorageService.removeItem('Donhang')
    }
    async SearchDonhang(SearchParams: any) {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(SearchParams),
            };
            const response = await fetch(`${environment.APIURL}/donhang/search`, options);
            const data = await response.json();
            this._donhang.next(data.items[0])
            return data;
        } catch (error) {
            return console.error(error);
        }
    }
    getGiamgia() {
        if (this.Donhang.hasOwnProperty('Khuyenmai')) {
            if (this.Donhang.Khuyenmai.Type.Value == 'phantram') {
                this.Donhang.Giamgia = this.Donhang.SubTotal * (Number(this.Donhang.Khuyenmai.Value) / 100)
                return this.Donhang.Giamgia
            }
            else {
                if (this.Donhang.Khuyenmai.Value > this.Donhang.SubTotal) {
                    this.Donhang.Giamgia = 0
                }
                else {
                    this.Donhang.Giamgia = this.Donhang.Khuyenmai.Value
                }

            }
        }
        else this.Donhang.Giamgia = 0
    }
    getSum(data: any, field: any, field1: any) {
        if (field1) {
            return data?.reduce((acc: any, item: any) => acc + item[field] * item.Giachon[field1], 0) || 0;
        }
        else {
            return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
        }
    }
    getSumThucte(data: any, field: any, field1: any) {
        if (field1) {
            return data?.reduce((acc: any, item: any) => acc + item[field] * item[field1], 0) || 0;
        }
        else {
            return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
        }
    }
    async getDonhang(): Promise<any> {
        this.DonHangAdmin(this.Donhang)
        // this.DonHangSite(this.Donhang)
        // this.getGiamgia()        
        // this.Donhang.SubTotal = this.Donhang.Giohangs.reduce((acc: any, item: any) => acc + item.Soluong * item.Giachon?.gia, 0) || 0;
        // this.Donhang.Total =Number(this.Donhang.SubTotal)||0 + Number(this.Donhang.Vanchuyen.Phivanchuyen)||0 - Number(this.Donhang.Giamgia)||0
        // this._donhang.next(this.Donhang)
        // this._LocalStorageService.setItem('Donhang', this.Donhang)
    }

    async TinhGiamgia(item: any): Promise<any> {
        if (item.hasOwnProperty('Khuyenmai') && Object.entries(item.Khuyenmai).length !== 0) {
            if (item?.Khuyenmai?.Type?.Value == 'phantram') {
                return (Number(item?.Khuyenmai?.Value) / 100);
            } else {
                // console.log(item?.Khuyenmai?.Value);
                // console.log(item?.SubTotal);

                if (Number(item?.Khuyenmai?.Value) > Number(item?.SubTotal)) {
                    return 0;
                } else {
                    return item?.Khuyenmai?.Value;
                }
            }
        } else {
            return 0;
        }
    }

    async DonHangSite(item: any) {
        item.MaDonHang = genMaDonhang((await this.getSoluongDon()) + 1)
        if (item?.Khuyenmai?.Type?.Value == 'free') {
            item.Vanchuyen.Phivanchuyen = 0;
        } else {
            item.Vanchuyen.Phivanchuyen = Math.round(item.Vanchuyen.Phivanchuyen / 1000) * 1000;
        }
        item.Giamgia = await this.TinhGiamgia(item);
        item.SubTotal = item.Giohangs.reduce((acc: any, item: any) => acc + item.Soluong * item.Giachon?.gia, 0);
        item.SubTotalTT = item.Giohangs.reduce((acc: any, item: any) => acc + item.Giachon.SLTT * item.Giachon.GiaCoSo, 0);
        if (item?.Khuyenmai?.Type?.Value == 'phantram') {
            item.Total = item.SubTotal * (1 - Number(item.Giamgia)) + item.Vanchuyen.Phivanchuyen;
            item.TotalTT = item.SubTotalTT * (1 - Number(item.Giamgia)) + item.Vanchuyen.Phivanchuyen;
        }
        else {
            item.Total = item.SubTotal + item.Vanchuyen.Phivanchuyen - item.Giamgia || 0;
            item.TotalTT = item.SubTotalTT + item.Vanchuyen.Phivanchuyen - Number(item.Giamgia) || 0;
        }
        this._donhang.next(item);
        this._addonhang.next(item);
        this._LocalStorageService.setItem('Donhang', this.Donhang);
        // console.log(item);

    }

    async DonHangAdmin(item: any) {
        if (item?.Giohangs?.Sanpham) {
            if (!item.MaDonHang) {
                item.MaDonHang = genMaDonhang((await this.getSoluongDon()) + 1)
            }
            if (item?.Khuyenmai?.Type?.Value == 'free') {
                item.Vanchuyen.Phivanchuyen = 0;
            } else {
                item.Vanchuyen.Phivanchuyen = Math.round(item.Vanchuyen.Phivanchuyen / 1000) * 1000;
            }
            item.Giamgia = await this.TinhGiamgia(item);
            item.SubTotal = item?.Giohangs?.Sanpham?.reduce((acc: any, item: any) => acc + item.Soluong * item.Giachon?.gia, 0);
            // item.Total = item.SubTotal + item.Vanchuyen.Phivanchuyen - item.Giamgia || 0;
            item.SubTotalTT = item?.Giohangs?.Sanpham?.reduce((acc: any, item: any) => acc + item.Giachon.SLTT * item.Giachon.GiaCoSo, 0);
            // item.TotalTT = item.SubTotalTT + item.Vanchuyen.Phivanchuyen - Number(item.Giamgia) || 0;
            if (item?.Khuyenmai?.Type?.Value == 'phantram') {
                item.Total = item.SubTotal * (1 - Number(item.Giamgia)) + item.Vanchuyen.Phivanchuyen;
                item.TotalTT = item.SubTotalTT * (1 - Number(item.Giamgia)) + item.Vanchuyen.Phivanchuyen;
            }
            else {
                item.Total = item.SubTotal + item.Vanchuyen.Phivanchuyen - item.Giamgia || 0;
                item.TotalTT = item.SubTotalTT + item.Vanchuyen.Phivanchuyen - Number(item.Giamgia) || 0;
            }
            //  console.log(await this.TinhGiamgia(item));
            this._donhang.next(item);
            this._addonhang.next(item);
            // console.log(item);
            this._LocalStorageService.setItem('Donhang', this.Donhang)
        }
        else {
            this._LocalStorageService.removeItem('Donhang')
        }

    }
}
