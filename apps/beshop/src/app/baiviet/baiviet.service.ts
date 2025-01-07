import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';
import { BaivietEntity } from './entities/baiviet.entity';
import { DanhmucService } from '../danhmuc/danhmuc.service';
@Injectable()
export class BaivietService {
  constructor(
    @InjectRepository(BaivietEntity)
    private BaivietRepository: Repository<BaivietEntity>,
    private _DanhmucService: DanhmucService
  ) { }
  async create(data: any) {    
    const check = await this.findslug(data.Slug)
    if(!check) {
      this.BaivietRepository.create(data);
      return await this.BaivietRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.BaivietRepository.find();
  }
  async listtype() {
    // const result =  await this.BaivietRepository.find();
    // const result1 = result.map(item => item.Type);
    // const uniqueSlugs = new Set(result1.map((item:any) => item.Slug));
    // const uniqueData = Array.from(uniqueSlugs).map(slug => result1.find((item:any) => item.Slug === slug));  
    // return uniqueData
    const result = await this.BaivietRepository.find();
    const uniqueSlugs = new Set(result.map((item:any) => item.Type.Slug));
    const uniqueData = Array.from(uniqueSlugs).map(slug => result.find((item:any) => item.Type.Slug === slug)?.Type);
    return uniqueData;
  }
  async findid(id: string) {
    const item:any = await this.BaivietRepository.findOne({ where: { id: id } });
    item.Danhmuc = await this._DanhmucService.findid(item.idDM);
    return item
  }
  // async findSHD(data: any) {
  //   return await this.BaivietRepository.findOne({
  //     where: {
  //       SHD: data.SHD,
  //       Type: data.Type
  //     },
  //   });
  // }
  async findslug(Slug: any) {
    const result = await this.BaivietRepository.findOne({
      where: { Slug: Slug },
    });    
    return result
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.BaivietRepository.count();
    const baiviets = await this.BaivietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: baiviets,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.BaivietRepository.createQueryBuilder('baiviet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('baiviet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('baiviet.Title LIKE :Title', { Title: `%${params.Query}%` })
      .orWhere('baiviet.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      .orWhere('baiviet.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Title) {
      queryBuilder.andWhere('baiviet.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('baiviet.Type LIKE :Type', { Type: `%${params.Type}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('baiviet.Type LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    if (params.hasOwnProperty('id')) {
      queryBuilder.andWhere('baiviet.id = :id', { id: `${params.id}` });
    }
    if (params.hasOwnProperty('idDM')) {
      queryBuilder.andWhere('baiviet.idDM = :idDM', { idDM: `${params.idDM}` });
    }
    if (params.hasOwnProperty('Status')) {
      queryBuilder.andWhere('baiviet.Status = :Status', { Status: `${params.Status}` });
    }
    const [item, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
      const items = await Promise.all(
        item.map(async (v: any) => {
          v.Danhmuc = await this._DanhmucService.findid(v.idDM);
          return v; 
        })
      );   
      // items.forEach(async (v:any) => {
      //   v.Danhmuc = await this._DanhmucService.findid(v.idDM);
      // });  
      console.log(items);
           
    return { items, totalCount };
  }
  async update(id: string, UpdateBaivietDto: UpdateBaivietDto) {
    this.BaivietRepository.save(UpdateBaivietDto);
    return await this.BaivietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.BaivietRepository.delete(id);
    return { deleted: true };
  }
}
