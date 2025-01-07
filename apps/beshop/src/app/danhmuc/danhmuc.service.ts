import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDanhmucDto } from './dto/create-danhmuc.dto';
import { UpdateDanhmucDto } from './dto/update-danhmuc.dto';
import { DanhmucEntity } from './entities/danhmuc.entity';
@Injectable()
export class DanhmucService {
  constructor(
    @InjectRepository(DanhmucEntity)
    private DanhmucRepository: Repository<DanhmucEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.DanhmucRepository.create(data);
      return await this.DanhmucRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.DanhmucRepository.find();
  }
  async findid(id: string){
    return await this.DanhmucRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.DanhmucRepository.findOne({
      where: {
        Title: data.Title,
      },
    });
  }
  async findslug(Slug: any) {
    return await this.DanhmucRepository.findOne({
      where: { Slug: Slug },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.DanhmucRepository.count();
    const danhmucs = await this.DanhmucRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: danhmucs,
    };
  }
  async findQuery(params: any) {
    const queryBuilder = this.DanhmucRepository.createQueryBuilder('danhmuc');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('danhmuc.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('danhmuc.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Status')) {
      queryBuilder.andWhere('danhmuc.Status LIKE :Status', { Status: `${params.Status}` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('danhmuc.Type LIKE :Type', { Type: `${params.Type}` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('danhmuc.Slug LIKE :Slug', { Slug: `${params.Slug}` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateDanhmucDto: UpdateDanhmucDto) {
    this.DanhmucRepository.save(UpdateDanhmucDto);
    return await this.DanhmucRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.DanhmucRepository.delete(id);
    return { deleted: true };
  }
}
