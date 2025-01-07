import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateGiohangDto } from './dto/create-giohang.dto';
import { UpdateGiohangDto } from './dto/update-giohang.dto';
import { GiohangEntity } from './entities/giohang.entity';
@Injectable()
export class GiohangService {
  constructor(
    @InjectRepository(GiohangEntity)
    private GiohangRepository: Repository<GiohangEntity>
  ) { }
  async create(data: any) {
      this.GiohangRepository.create(data);
      return await this.GiohangRepository.save(data);
  }

  async findAll() {
    return await this.GiohangRepository.find();
  }
  async findid(id: string) {
    return await this.GiohangRepository.findOne({ where: { id: id } });
  }
  async findlistid(id: string) {
    return await this.GiohangRepository.find({ where: { id: id } });
  }
  // async findSHD(data: any) {
  //   return await this.GiohangRepository.findOne({
  //     where: {
  //       SHD: data.SHD,
  //       Type: data.Type
  //     },
  //   });
  // }
  async findslug(Slug: any) {
    return await this.GiohangRepository.findOne({
      where: { Title: Slug },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.GiohangRepository.count();
    const giohangs = await this.GiohangRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: giohangs,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.GiohangRepository.createQueryBuilder('giohang');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('giohang.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('giohang.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, data: any) {
    console.log(id,data.Title);
    
    await this.GiohangRepository.save(data);
    return await this.GiohangRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.GiohangRepository.delete(id);
    return { deleted: true };
  }
}
