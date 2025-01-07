import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DanhmucbaivietEntity } from './entities/danhmucbaiviet.entity';
@Injectable()
export class DanhmucbaivietService {
  constructor(
    @InjectRepository(DanhmucbaivietEntity)
    private DanhmucbaivietRepository: Repository<DanhmucbaivietEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.DanhmucbaivietRepository.create(data);
      return await this.DanhmucbaivietRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }
  async findAll() {
    return await this.DanhmucbaivietRepository.find();
  }
  async findid(id: string) {
    return await this.DanhmucbaivietRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.DanhmucbaivietRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.DanhmucbaivietRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.DanhmucbaivietRepository.count();
    const danhmucbaiviets = await this.DanhmucbaivietRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: danhmucbaiviets,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.DanhmucbaivietRepository.createQueryBuilder('danhmucbaiviet');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('danhmucbaiviet.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('danhmucbaiviet.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateDanhmucbaivietDto: any) {
    this.DanhmucbaivietRepository.save(UpdateDanhmucbaivietDto);
    return await this.DanhmucbaivietRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.DanhmucbaivietRepository.delete(id);
    return { deleted: true };
  }
}
