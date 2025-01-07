import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateLienheDto } from './dto/create-lienhe.dto';
import { UpdateLienheDto } from './dto/update-lienhe.dto';
import { LienheEntity } from './entities/lienhe.entity';
@Injectable()
export class LienheService {
  constructor(
    @InjectRepository(LienheEntity)
    private LienheRepository: Repository<LienheEntity>
  ) { }
  async create(data: any) {    
      this.LienheRepository.create(data);
      return await this.LienheRepository.save(data);
  }

  async findAll() {
    return await this.LienheRepository.find();
  }
  async findid(id: string) {
    return await this.LienheRepository.findOne({ where: { id: id } });
  }
  async findslug(SDT: any) {
    const result = await this.LienheRepository.findOne({
      where: { SDT: SDT },
    });    
    return result
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.LienheRepository.count();
    const lienhes = await this.LienheRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: lienhes,
    };
  }
  async findQuery(params: any) {
    console.log(params);
    
    const queryBuilder = this.LienheRepository.createQueryBuilder('lienhe');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('lienhe.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('lienhe.Title LIKE :Title', { Title: `%${params.Query}%` })
      .orWhere('lienhe.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      .orWhere('lienhe.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Title) {
      queryBuilder.andWhere('lienhe.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('lienhe.Type LIKE :Type', { Type: `%${params.Type}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('lienhe.Type LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateLienheDto: UpdateLienheDto) {
    this.LienheRepository.save(UpdateLienheDto);
    return await this.LienheRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.LienheRepository.delete(id);
    return { deleted: true };
  }
}
