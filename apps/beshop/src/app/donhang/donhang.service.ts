import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DonhangEntity } from './entities/donhang.entity';
import { GiohangService } from '../giohang/giohang.service';
import { KhachhangService } from '../khachhang/khachhang.service';
import { genMaDonhang } from '../shared.utils';
@Injectable()
export class DonhangService {
  constructor(
    @InjectRepository(DonhangEntity)
    private DonhangRepository: Repository<DonhangEntity>,
    private _GiohangService: GiohangService,
    private _KhachhangService: KhachhangService,
  ) { }
  async create(data: any) {
    const Donhang:any=data
    if(!data.hasOwnProperty('idKH')&&data.hasOwnProperty('Khachhang')){
      const Khachhang = await this._KhachhangService.create(data.Khachhang)
      Donhang.idKH = Khachhang.id
      Donhang.Khachhang = Khachhang
    }
    const maxPrice = await this.DonhangRepository.createQueryBuilder('donhang')
    .select('MAX(donhang.Ordering)', 'maxOrdering')
    .getRawOne();
    Donhang.MaDonHang = genMaDonhang(maxPrice.maxOrdering+1)
    const newEntity = { ...Donhang, Ordering: maxPrice.maxOrdering+1}
    const result =   await this.DonhangRepository.save(newEntity);
    this.DonhangRepository.create(Donhang);
    return result
  }
  async getHighestOrder(): Promise<number | null> {
    const highestOrderEntity = await this.DonhangRepository.findOne({ order: { Ordering: 'DESC' } }); // Find entity with highest order
    return highestOrderEntity?.Ordering ?? null;
  }
  async findAll() {
    const items = await this.DonhangRepository.find();
    // items?.map(async (v: any) => {
    //   v.Giohangs = await this._GiohangService.findid(v.idGiohang);
    //   v.Khachhang = await this._KhachhangService.findid(v.idKH);
    //   return v; 
    // })
    return items
  }
  async getSoluong() {
    return await this.DonhangRepository.findAndCount();
  }
  async findid(id: string) {
    const Donhang = await this.DonhangRepository.findOne({ where: { id: id } });
    return Donhang ||{}
  }
  async findbyuser(id: string) {
    const Donhang:any = await this.DonhangRepository.find({ where: { idKH: id } });
    console.error(Donhang);
    return Donhang||{}
  }
  async findSHD(data: any) {
    return await this.DonhangRepository.findOne({
      where: {
        MaDonHang: data.MaDonHang
      },
    });
  }
  async findslug(SHD: any) {
    return await this.DonhangRepository.findOne({
      where: { Status: SHD },
    });
  }
  async findmadonhang(madonhang: any) {
    return await this.DonhangRepository.findOne({
      where: { MaDonHang: madonhang },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.DonhangRepository.count();
    const donhangs = await this.DonhangRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: donhangs,
    };
  }
  async findQuery(params: any) {
    console.error(params);

    const queryBuilder = this.DonhangRepository.createQueryBuilder('donhang');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('donhang.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.MaDonHang) {
      queryBuilder.andWhere('donhang.MaDonHang = :MaDonHang', { MaDonHang: `${params.MaDonHang}` });
    }
    if (params.hasOwnProperty('isDelete')) {
      queryBuilder.andWhere('donhang.isDelete = :isDelete', { isDelete: `${params.isDelete}` });
    }
    let [items, totalCount]:any = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
      // const items = await Promise.all(
      //   item.map(async (v: any) => {
      //     v.Giohangs = await this._GiohangService.findid(v.idGiohang);
      //     v.Khachhang = await this._KhachhangService.findid(v.idKH);
      //     return v; 
      //   })
      // );         
    return { items, totalCount };
  }
  async update(id: string, data: any) {
    this.DonhangRepository.save(data);
    const result = await this.DonhangRepository.findOne({ where: { id: id } });
    console.error(result);
    
    return result
  }
  // async update(id: string, data: any) {
  //   console.log(id,data);
  //   if(data.Giohangs){await this._GiohangService.update(data.Giohangs.id,data.Giohangs)}
  //   if(data.Khachhang){await this._KhachhangService.update(data.Khachhang.id,data.Khachhang)}
  //   if(id)
  //   {
  //     await this.DonhangRepository.save(data);
  //     const result = await this.DonhangRepository.findOne({ where: { id: id } });
  //     return result
  //   }
  //   else return data
     
 
  // }
  async remove(id: string) {
    await this.DonhangRepository.delete(id);
    return { deleted: true };
  }
}