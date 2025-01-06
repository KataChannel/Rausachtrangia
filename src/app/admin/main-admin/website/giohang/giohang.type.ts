export interface Donhang {
    id:         string;
    idKH:       string;
    MaDonHang:  string;
    idGiohang:  string;
    Image:      Image;
    Thanhtoan:  Thanhtoan;
    Vanchuyen:  Vanchuyen;
    Khuyenmai:  Image;
    Diachis:    Diachi[];
    Ghichu:     string;
    Lydohuy:    string;
    Giamgia:    number;
    Total:      number;
    SubTotal:   number;
    TotalTT:    number;
    SubTotalTT: number;
    Type:       string;
    Ordering:   number;
    Status:     number;
    isDelete:   boolean;
    CreateAt:   Date;
    UpdateAt:   Date;
    DeleteAt:   null;
    idCreate:   null;
    Giohangs:   Giohangs;
    Khachhang:  Khachhang;
}

export interface Diachi {
    id:     string;
    Active: boolean;
    Diachi: string;
    Quan:   string;
    Phuong: string;
}

export interface Giohangs {
    id:        string;
    idKH:      string;
    Title:     string;
    Sanpham:   Sanpham[];
    Khachhang: Khachhang;
    Total:     string;
    GiaCoSo:   string;
    Mota:      string;
    Type:      string;
    Ordering:  number;
    Status:    number;
    CreateAt:  Date;
    UpdateAt:  Date;
    DeleteAt:  null;
    idCreate:  null;
}

export interface Khachhang {
    Hoten:    string;
    Diachi:   string;
    SDT:      string;
    idCreate: null;
    id:       string;
    Email:    string;
    Image:    Image;
    Type:     string;
    Ordering: number;
    Status:   number;
    CreateAt: Date;
    UpdateAt: Date;
    DeleteAt: null;
}

export interface Image {
}

export interface Sanpham {
    id:      string;
    id_cat:  string;
    Title:   string;
    Danhmuc: string;
    Slug:    string;
    Giachon: Giachon;
    Giagoc:  Giagoc[];
    Image:   SanphamImage;
    Soluong: number;
}

export interface Giachon {
    MaSP:      string;
    khoiluong: string;
    gia:       number;
    dvt:       string;
    GiaCoSo:   string;
    SLTT:      string;
}

export interface Giagoc {
    MaSP:      string;
    khoiluong: string;
    gia:       number;
    dvt:       string;
    GiaCoSo:   number | string;
    SLTT:      number | string;
}

export interface SanphamImage {
    Hinhchinh: Hinhchinh;
}

export interface Hinhchinh {
    name:       string;
    Mime:       string;
    spath:      string;
    src:        string;
    alt:        null;
    Title:      null;
    Lienket:    null;
    pathmobile: null;
    idDrive:    null;
    idCreate:   null;
    id:         string;
    Type:       string;
    Ordering:   number;
    Status:     number;
    CreateAt:   Date;
    UpdateAt:   Date;
    DeleteAt:   null;
}

export interface Thanhtoan {
    Hinhthuc: string;
}

export interface Vanchuyen {
    Phivanchuyen: number;
    value:        number;
    text:         string;
}
