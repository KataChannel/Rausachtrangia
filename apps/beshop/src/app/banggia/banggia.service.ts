import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { BanggiaEntity } from './entities/banggia.entity';
  @Injectable()
  export class BanggiaService {
    constructor(
      @InjectRepository(BanggiaEntity)
      private BanggiaRepository: Repository<BanggiaEntity>
    ) { }
    async create(data: any) {
      const check = await this.findSHD(data)
      if(!check) {
        this.BanggiaRepository.create(data);
        return await this.BanggiaRepository.save(data);
      }
      else {
        return { error: 1001, data: "Trùng Dữ Liệu" }
      }
  
    }
  
    async findAll() {
      return await this.BanggiaRepository.find();
    }
    async findid(id: string) {
      return await this.BanggiaRepository.findOne({ where: { id: id } });
    }
    async findSHD(data: any) {
      return await this.BanggiaRepository.findOne({
        where: {
          Title: data.Title,
          Type: data.Type
        },
      });
    }
    async findslug(Title: any) {
      return await this.BanggiaRepository.findOne({
        where: { Title: Title },
      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.BanggiaRepository.count();
      const Banggias = await this.BanggiaRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Banggias,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.BanggiaRepository.createQueryBuilder('Banggia');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Banggia.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Banggia.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdateBanggiaDto: any) {
      this.BanggiaRepository.save(UpdateBanggiaDto);
      return await this.BanggiaRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.BanggiaRepository.delete(id);
      return { deleted: true };
    }
  }