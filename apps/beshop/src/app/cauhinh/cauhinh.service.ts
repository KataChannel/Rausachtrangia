import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CauhinhEntity } from './entities/cauhinh.entity';
@Injectable()
export class CauhinhService {
  constructor(
    @InjectRepository(CauhinhEntity)
    private CauhinhRepository: Repository<CauhinhEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.CauhinhRepository.create(data);
      return await this.CauhinhRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.CauhinhRepository.find();
  }
  async findid(id: string) {
    return await this.CauhinhRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.CauhinhRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Slug: any) {
    return await this.CauhinhRepository.findOne({
      where: { Slug: Slug },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.CauhinhRepository.count();
    const cauhinhs = await this.CauhinhRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: cauhinhs,
    };
  }
  async findQuery(params: any) {
    console.log(params);
    
    const queryBuilder = this.CauhinhRepository.createQueryBuilder('cauhinh');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('cauhinh.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('cauhinh.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, data: any) {
    this.CauhinhRepository.save(data);
    const result = await this.CauhinhRepository.findOne({ where: { id: id } });
    console.log(result);
  }
  async remove(id: string) {
    console.error(id)
    await this.CauhinhRepository.delete(id);
    return { deleted: true };
  }
}
