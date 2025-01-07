import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateKhachhangDto } from './dto/create-khachhang.dto';
import { UpdateKhachhangDto } from './dto/update-khachhang.dto';
import { KhachhangEntity } from './entities/khachhang.entity';
@Injectable()
export class KhachhangService {
  constructor(
    @InjectRepository(KhachhangEntity)
    private KhachhangRepository: Repository<KhachhangEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSDT(data)
    if(!check) {
      this.KhachhangRepository.create(data);
      return await this.KhachhangRepository.save(data);
    }
    else {
      return check
    }

  }

  async findAll() {
    return await this.KhachhangRepository.find();
  }
  async findid(id: string) {
    return await this.KhachhangRepository.findOne({ where: { id: id } });
  }
  async findSDT(data: any) {
    return await this.KhachhangRepository.findOne({
      where: {
        SDT: data.SDT
      },
    });
  }
  async findslug(SDT: any) {
    return await this.KhachhangRepository.findOne({
      where: { SDT: SDT },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.KhachhangRepository.count();
    const khachhangs = await this.KhachhangRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: khachhangs,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.KhachhangRepository.createQueryBuilder('khachhang');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('khachhang.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('khachhang.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateKhachhangDto: UpdateKhachhangDto) {
    this.KhachhangRepository.save(UpdateKhachhangDto);
    return await this.KhachhangRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.KhachhangRepository.delete(id);
    return { deleted: true };
  }
}
