import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { RoleEntity } from './entities/role.entity';
  @Injectable()
  export class RoleService {
    constructor(
      @InjectRepository(RoleEntity)
      private RoleRepository: Repository<RoleEntity>
    ) { }
    async create(data: any) {
        this.RoleRepository.create(data);
        return await this.RoleRepository.save(data);
    }
  
    async findAll() {
      return await this.RoleRepository.find();
    }
    async findid(id: string) {
      return await this.RoleRepository.findOne({ where: { id: id } });
    }
    async findslug(Title: any) {
      return await this.RoleRepository.findOne({
      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.RoleRepository.count();
      const Roles = await this.RoleRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Roles,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.RoleRepository.createQueryBuilder('Role');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Role.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Role.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdateRoleDto: any) {
      this.RoleRepository.save(UpdateRoleDto);
      return await this.RoleRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.RoleRepository.delete(id);
      return { deleted: true };
    }
  }