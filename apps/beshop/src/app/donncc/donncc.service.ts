import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { In, Like, Repository } from 'typeorm';
  import { DonnccEntity } from './entities/donncc.entity';
import { NhacungcapService } from '../nhacungcap/nhacungcap.service';
import { SanphamService } from '../sanpham/sanpham.service';
  @Injectable()
  export class DonnccService {
    constructor(
      @InjectRepository(DonnccEntity)
      private DonnccRepository: Repository<DonnccEntity>,
      private _NhacungcapService:NhacungcapService,
      private _SanphamService:SanphamService
    ) { }
    async create(data: any) {
      try {
      const newDonncc = this.DonnccRepository.create(data);
      const result:any = await this.DonnccRepository.save(newDonncc);
      result?.Sanpham?.forEach(async (v: any) => {
        const SP = await this._SanphamService.findid(v.id);
        if(SP){
          SP.Soluong =  SP.Soluong - v.Soluong;
          await this._SanphamService.update(v.id,SP);
        }
      });
      return result
      } catch (error) {
        return {code:error.code,message:error.errno}
      }
    }
  
    async findAll() {
      return await this.DonnccRepository.find();
    }
    async findid(id: string) {
      return await this.DonnccRepository.findOne({ where: { id: id } });
    }
    async findlistid(ids: any) {
      return await this.DonnccRepository.findBy({ id: In(ids) })
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.DonnccRepository.count();
      const Donnccs = await this.DonnccRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Donnccs,
      };
    }

    async search(params: any) {
      const queryBuilder = this.DonnccRepository.createQueryBuilder('Donncc');
      if (params.hasOwnProperty('Batdau') && params.hasOwnProperty('Ketthuc')) {
      queryBuilder.andWhere('Donncc.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
      }
      if (params.hasOwnProperty('MaDH')) {
      queryBuilder.andWhere('Donncc.MaDH LIKE :MaDH', { MaDH: `%${params.MaDH}%` });
      }
      if (params.hasOwnProperty('idNCC')) {
      queryBuilder.andWhere('Donncc.idNCC LIKE :idNCC', { idNCC: `%${params.idNCC}%` });
      }
      if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('Donncc.Type LIKE :Type', { Type: `%${params.Type}%` });
      }
      if (params.hasOwnProperty('Status')) {
      queryBuilder.andWhere('Donncc.Status = :Status', { Status: params.Status });
      }
      if (params.hasOwnProperty('idCreate')) {
      queryBuilder.andWhere('Donncc.idCreate = :idCreate', { idCreate: params.idCreate });
      }
      if (params.hasOwnProperty('getOne') && params.getOne) {
      const item = await queryBuilder.getOne();
      console.log(item);
      return { item };
      } else {
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
      return { items, totalCount };
      }
    }
    async update(id: string, data: any) {
      this.DonnccRepository.save(data);

      data?.Sanpham?.forEach(async (v: any) => {
        const SP = await this._SanphamService.findid(v.id);
        if(SP){
          SP.Soluong =  SP.Soluong - data.Soluong;
          await this._SanphamService.update(v.id,SP);
        }
      });

      return await this.DonnccRepository.findOne({ where: { id: id } });

    }
    async remove(id: string) {
      console.error(id)
      await this.DonnccRepository.delete(id);
      return { deleted: true };
    }
  }