import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { PhieukhoEntity } from './entities/phieukho.entity';
import { SanphamService } from '../sanpham/sanpham.service';
  @Injectable()
  export class PhieukhoService {
    constructor(
      @InjectRepository(PhieukhoEntity)
      private PhieukhoRepository: Repository<PhieukhoEntity>,
      private _SanphamService: SanphamService
    ) { }
    async create(data: any) {
      const check = await this.findSHD(data)
      if(!check) {
        this.PhieukhoRepository.create(data);
        const result =  await this.PhieukhoRepository.save(data);
        result?.Sanpham?.forEach(async (v: any) => {
          const SP = await this._SanphamService.findid(v.id);
          if(SP){
            if(result.Type == "NHAP") {
              SP.SoluongTT =  SP.SoluongTT + v.Soluong;
              await this._SanphamService.update(v.id,SP);
            }
            else if(result.Type == "XUAT" && SP.SoluongTT < v.Soluong) {
              return { error: 1001, data: "Số lượng tồn kho không đủ" }
            }
            else if(result.Type == "XUAT") {
              SP.SoluongTT =  SP.SoluongTT - v.Soluong;
              await this._SanphamService.update(v.id,SP);
            }
          }
        });
      }
      else {
        return { error: 1001, data: "Trùng Dữ Liệu" }
      }
  
    }
  
    async findAll() {
      return await this.PhieukhoRepository.find();
    }
    async findid(id: string) {
      return await this.PhieukhoRepository.findOne({ where: { id: id } });
    }
    async findSHD(data: any) {
      return await this.PhieukhoRepository.findOne({
        where: {
          Type: data.Type
        },
      });
    }
    async findslug(Title: any) {
      return await this.PhieukhoRepository.findOne({

      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.PhieukhoRepository.count();
      const Phieukhos = await this.PhieukhoRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Phieukhos,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.PhieukhoRepository.createQueryBuilder('Phieukho');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Phieukho.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Phieukho.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdatePhieukhoDto: any) {
      this.PhieukhoRepository.save(UpdatePhieukhoDto);
      return await this.PhieukhoRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.PhieukhoRepository.delete(id);
      return { deleted: true };
    }
  }