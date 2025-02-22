import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { QuanlykhoEntity } from './entities/quanlykho.entity';
  @Injectable()
  export class QuanlykhoService {
    constructor(
      @InjectRepository(QuanlykhoEntity)
      private QuanlykhoRepository: Repository<QuanlykhoEntity>
    ) { }
    async create(data: any) {
      const check = await this.findSHD(data)
      if(!check) {
        this.QuanlykhoRepository.create(data);
        return await this.QuanlykhoRepository.save(data);
      }
      else {
        return { error: 1001, data: "Trùng Dữ Liệu" }
      }
  
    }
  
    async findAll() {
      return await this.QuanlykhoRepository.find();
    }
    async findid(id: string) {
      return await this.QuanlykhoRepository.findOne({ where: { id: id } });
    }
    async findSHD(data: any) {
      return await this.QuanlykhoRepository.findOne({
        where: {
          Title: data.Title,
          Type: data.Type
        },
      });
    }
    async findslug(Title: any) {
      return await this.QuanlykhoRepository.findOne({
        where: { Title: Title },
      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.QuanlykhoRepository.count();
      const Quanlykhos = await this.QuanlykhoRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Quanlykhos,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.QuanlykhoRepository.createQueryBuilder('Quanlykho');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Quanlykho.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Quanlykho.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdateQuanlykhoDto: any) {
      this.QuanlykhoRepository.save(UpdateQuanlykhoDto);
      return await this.QuanlykhoRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.QuanlykhoRepository.delete(id);
      return { deleted: true };
    }
  }