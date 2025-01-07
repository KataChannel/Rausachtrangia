import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SlideEntity } from './entities/slide.entity';
@Injectable()
export class SlideService {
  constructor(
    @InjectRepository(SlideEntity)
    private SlideRepository: Repository<SlideEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.SlideRepository.create(data);
      return await this.SlideRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.SlideRepository.find();
  }
  async findid(id: string) {
    return await this.SlideRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.SlideRepository.findOne({
      where: {
        Slug: data.Slug,
        Type: data.Type
      },
    });
  }
  async findslug(Slug: any) {
    return await this.SlideRepository.findOne({
      where: { Slug: Slug },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.SlideRepository.count();
    const slides = await this.SlideRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: slides,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.SlideRepository.createQueryBuilder('slide');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('slide.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('slide.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('idDM')) {
      queryBuilder.andWhere('slide.idDM = :idDM', { idDM: `${params.idDM}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, data: any) {
    this.SlideRepository.save(data);
    return await this.SlideRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.SlideRepository.delete(id);
    return { deleted: true };
  }
}
