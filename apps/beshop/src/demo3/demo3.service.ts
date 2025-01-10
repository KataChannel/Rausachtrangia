import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Demo3Entity } from './entities/demo3.entity';
@Injectable()
export class Demo3Service {
  constructor(
    @InjectRepository(Demo3Entity)
    private Demo3Repository: Repository<Demo3Entity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.Demo3Repository.create(data);
      return await this.Demo3Repository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.Demo3Repository.find();
  }
  async findid(id: string) {
    return await this.Demo3Repository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.Demo3Repository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.Demo3Repository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.Demo3Repository.count();
    const Demo3s = await this.Demo3Repository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: Demo3s,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.Demo3Repository.createQueryBuilder('Demo3');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('Demo3.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('Demo3.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateDemo3Dto: any) {
    this.Demo3Repository.save(UpdateDemo3Dto);
    return await this.Demo3Repository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.Demo3Repository.delete(id);
    return { deleted: true };
  }
}