import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { PhieugiaodichEntity } from './entities/phieugiaodich.entity';
  @Injectable()
  export class PhieugiaodichService {
    constructor(
      @InjectRepository(PhieugiaodichEntity)
      private PhieugiaodichRepository: Repository<PhieugiaodichEntity>
    ) { }
    async create(data: any) {
        this.PhieugiaodichRepository.create(data);
        return await this.PhieugiaodichRepository.save(data);  
    }
  
    async findAll() {
      return await this.PhieugiaodichRepository.find();
    }
    async findid(id: string) {
      return await this.PhieugiaodichRepository.findOne({ where: { id: id } });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.PhieugiaodichRepository.count();
      const Phieugiaodichs = await this.PhieugiaodichRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Phieugiaodichs,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.PhieugiaodichRepository.createQueryBuilder('Phieugiaodich');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Phieugiaodich.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Phieugiaodich.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdatePhieugiaodichDto: any) {
      this.PhieugiaodichRepository.save(UpdatePhieugiaodichDto);
      return await this.PhieugiaodichRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.PhieugiaodichRepository.delete(id);
      return { deleted: true };
    }
  }