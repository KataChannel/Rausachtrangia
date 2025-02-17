import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
  import { NhacungcapEntity } from './entities/nhacungcap.entity';
  @Injectable()
  export class NhacungcapService {
    constructor(
      @InjectRepository(NhacungcapEntity)
      private NhacungcapRepository: Repository<NhacungcapEntity>
    ) { }
    async create(data: any) {
      const check = await this.findSHD(data)
      if(!check) {
        this.NhacungcapRepository.create(data);
        return await this.NhacungcapRepository.save(data);
      }
      else {
        return { error: 1001, data: "Trùng Dữ Liệu" }
      }
  
    }
  
    async findAll() {
      return await this.NhacungcapRepository.find();
    }
    async findid(id: string) {
      return await this.NhacungcapRepository.findOne({ where: { id: id } });
    }
    async findSHD(data: any) {
      return await this.NhacungcapRepository.findOne({
        where: {
          Title: data.Title,
          Type: data.Type
        },
      });
    }
    async findslug(Title: any) {
      return await this.NhacungcapRepository.findOne({
        where: { Title: Title },
      });
    }
    async findPagination(page: number, perPage: number) {
      const skip = (page - 1) * perPage;
      const totalItems = await this.NhacungcapRepository.count();
      const Nhacungcaps = await this.NhacungcapRepository.find({ skip, take: perPage });
      return {
        currentPage: page,
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        data: Nhacungcaps,
      };
    }
    async findQuery(params: any) {
      console.error(params);
      const queryBuilder = this.NhacungcapRepository.createQueryBuilder('Nhacungcap');
      if (params.Batdau && params.Ketthuc) {
        queryBuilder.andWhere('Nhacungcap.CreateAt BETWEEN :startDate AND :endDate', {
          startDate: params.Batdau,
          endDate: params.Ketthuc,
        });
      }
      if (params.Title) {
        queryBuilder.andWhere('Nhacungcap.Title LIKE :Title', { SDT: `%${params.Title}%` });
      }
      const [items, totalCount] = await queryBuilder
        .limit(params.pageSize || 10) // Set a default page size if not provided
        .offset(params.pageNumber * params.pageSize || 0)
        .getManyAndCount();
      console.log(items, totalCount);
  
      return { items, totalCount };
    }
    async update(id: string, UpdateNhacungcapDto: any) {
      this.NhacungcapRepository.save(UpdateNhacungcapDto);
      return await this.NhacungcapRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.NhacungcapRepository.delete(id);
      return { deleted: true };
    }
  }