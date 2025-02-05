import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { SanphamEntity } from './entities/sanpham.entity';
import { DanhmucService } from '../danhmuc/danhmuc.service';
@Injectable()
export class SanphamService {
  constructor(
    @InjectRepository(SanphamEntity)
    private SanphamRepository: Repository<SanphamEntity>,
    private _DanhmucService: DanhmucService
  ) {}
  async create(data: any) {
    const checkSP = await this.SanphamRepository.findOne({ where: { MaSP: data.MaSP } });
    if(!checkSP){
      this.SanphamRepository.create(data);
      return await this.SanphamRepository.save(data);      
    }
    else
    {
      return {error:1001,message:"Sản phẩm đã tồn tại"}
    }
  }
  async sync(data: any) {

    const item = await this.SanphamRepository.findOne({where: { MaSP: data.MaSP }});
    console.log(item);
    
    if(item)
    {
      const result = {...item,...data}
      return await this.SanphamRepository.save(result);
    }
    else {
      this.SanphamRepository.create(data);
      return await this.SanphamRepository.save(data);
    }   
  }

  async findAll() {
    return await this.SanphamRepository.find();
  }
  async findid(id: string) {
    const Sanpham:any =  await this.SanphamRepository.findOne({where: { id: id }});
    const Danhmuc = await this._DanhmucService.findAll()
    Sanpham.Danhmuc = Danhmuc.find((v1:any)=>v1.id ==Sanpham.idDM)
    return Sanpham
  }
  async findslug(slug: any) {
    const Sanpham:any =  await this.SanphamRepository.findOne({where: { Slug: slug}});
    const Danhmuc = await this._DanhmucService.findAll()
    Sanpham.Danhmuc = Danhmuc.find((v1:any)=>v1.id ==Sanpham.idDM)
    return Sanpham
  }
  async findPagination(page: number, perPage: number){
    const skip = (page - 1) * perPage;
    const totalItems = await this.SanphamRepository.count();
    const sanphams = await this.SanphamRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: sanphams,
    };
  }
  async findQuery(params: any) {
    console.log(params);
    const queryBuilder = this.SanphamRepository.createQueryBuilder('sanpham');
    if (params.hasOwnProperty('Danhmuc')) {
      const userIdsToFind = params.Danhmuc;
      //queryBuilder.andWhere(new In('sanpham.id_cat', params.Danhmuc));
      queryBuilder.where('sanpham.idDM IN (:...userIdsToFind)', { userIdsToFind });
      // queryBuilder.andWhere('sanpham.Title LIKE :Title', { Title: `%${params.Query}%` })
      // .orWhere('sanpham.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      // .orWhere('sanpham.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('sanpham.Title LIKE :Title', { Title: `%${params.Query}%` });
      // .orWhere('sanpham.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      // .orWhere('sanpham.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('sanpham.CreateAt BETWEEN :startDate AND :endDate', {
        startDate:params.Batdau,
        endDate:params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Title')) {
      queryBuilder.andWhere('sanpham.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('sanpham.Slug LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    if (params.hasOwnProperty('Status')) {
      queryBuilder.andWhere('sanpham.Status = :Status', { Status: `${params.Status}` });
    }
    if (params.hasOwnProperty('CreateAt')) {
      queryBuilder.orderBy('sanpham.CreateAt', params.CreateAt);
    }
    if (params.hasOwnProperty('idDM')) {
      queryBuilder.andWhere('sanpham.idDM = :idDM', { idDM: `${params.idDM}` });
    }
    if (params.hasOwnProperty('Filter')) {
      if(params.Filter=="Moi")
      {
        queryBuilder.orderBy('sanpham.GiaCoso','ASC');
        queryBuilder.andWhere('sanpham.Moi = 1');
      }
      else if(params.Filter=="Noibat")
      {
        queryBuilder.andWhere('sanpham.Noibat = 1');
      }
      else if(params.Filter=="Banchay"){
        queryBuilder.andWhere('sanpham.Banchay = 1');
      }
    }
    queryBuilder.orderBy('sanpham.CreateAt', 'DESC');
    let [items, totalCount] = await queryBuilder
    .limit(params.pageSize || 10) // Set a default page size if not provided
    .offset(params.pageNumber * params.pageSize || 0)
    .getManyAndCount();
    const Danhmuc = await this._DanhmucService.findAll()
    items.forEach((v:any)=>{
      v.Danhmuc = Danhmuc.find((v1:any)=>v1.id ==v.idDM)
      v.DMOrdering = Danhmuc.find((v1:any)=>v1.id ==v.idDM)?.Ordering
    })
    items.sort((a:any,b:any)=>b.DMOrdering - a.DMOrdering)
  return { items, totalCount };
  }
  async update(id: string, data: any) {
    console.log(id,data.Title);
    await this.SanphamRepository.save(data);
    return await this.SanphamRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.SanphamRepository.delete(id);
    return { deleted: true };
  }
}
