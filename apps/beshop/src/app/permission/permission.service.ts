import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { PermissionEntity } from './entities/permission.entity';
  @Injectable()
  export class PermissionService {
    constructor(
      @InjectRepository(PermissionEntity)
      private PermissionRepository: Repository<PermissionEntity>
    ) { }
    async create(data: any) {
        this.PermissionRepository.create(data);
        return await this.PermissionRepository.save(data);
      }
    async findAll() {
      return await this.PermissionRepository.find();
    }
    async findid(id: string) {
      return await this.PermissionRepository.findOne({ where: { id: id } });
    }
    async findslug(Title: any) {
      return await this.PermissionRepository.findOne({

      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.PermissionRepository.count();
      const Permissions = await this.PermissionRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Permissions,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.PermissionRepository.createQueryBuilder('Permission');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Permission.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Permission.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdatePermissionDto: any) {
      this.PermissionRepository.save(UpdatePermissionDto);
      return await this.PermissionRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.PermissionRepository.delete(id);
      return { deleted: true };
    }
  }