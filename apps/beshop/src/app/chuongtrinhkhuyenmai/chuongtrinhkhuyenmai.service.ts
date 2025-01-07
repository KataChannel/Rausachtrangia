import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateChuongtrinhkhuyenmaiDto } from './dto/create-chuongtrinhkhuyenmai.dto';
import { UpdateChuongtrinhkhuyenmaiDto } from './dto/update-chuongtrinhkhuyenmai.dto';
import { ChuongtrinhkhuyenmaiEntity } from './entities/chuongtrinhkhuyenmai.entity';
@Injectable()
export class ChuongtrinhkhuyenmaiService {
  constructor(
    @InjectRepository(ChuongtrinhkhuyenmaiEntity)
    private ChuongtrinhkhuyenmaiRepository: Repository<ChuongtrinhkhuyenmaiEntity>
  ) { }
  async create(data: any) {
    const check = await this.findCode(data.Code)
    if(!check) {
      this.ChuongtrinhkhuyenmaiRepository.create(data);
      return await this.ChuongtrinhkhuyenmaiRepository.save(data);
    }
    else {
      return check
    }

  }

  async findAll() {
    return await this.ChuongtrinhkhuyenmaiRepository.find();
  }
  async findid(id: string) {
    return await this.ChuongtrinhkhuyenmaiRepository.findOne({ where: { id: id } });
  }
  async findCode(data: any) {
    const result = await this.ChuongtrinhkhuyenmaiRepository.findOne({
      where: {
        Code: data
      },
    });    
    return result
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.ChuongtrinhkhuyenmaiRepository.count();
    const chuongtrinhkhuyenmais = await this.ChuongtrinhkhuyenmaiRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: chuongtrinhkhuyenmais,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.ChuongtrinhkhuyenmaiRepository.createQueryBuilder('chuongtrinhkhuyenmai');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('chuongtrinhkhuyenmai.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('chuongtrinhkhuyenmai.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateChuongtrinhkhuyenmaiDto: UpdateChuongtrinhkhuyenmaiDto) {
    this.ChuongtrinhkhuyenmaiRepository.save(UpdateChuongtrinhkhuyenmaiDto);
    return await this.ChuongtrinhkhuyenmaiRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.ChuongtrinhkhuyenmaiRepository.delete(id);
    return { deleted: true };
  }
}
