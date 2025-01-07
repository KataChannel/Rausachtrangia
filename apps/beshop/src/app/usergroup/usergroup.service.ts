import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UsergroupEntity } from './entities/usergroup.entity';
@Injectable()
export class UsergroupService {
  constructor(
    @InjectRepository(UsergroupEntity)
    private UsergroupRepository: Repository<UsergroupEntity>
  ) { }
  async create(data: any) {
    const check = await this.findSHD(data)
    if(!check) {
      this.UsergroupRepository.create(data);
      return await this.UsergroupRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.UsergroupRepository.find();
  }
  async findid(id: string) {
    return await this.UsergroupRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.UsergroupRepository.findOne({
      where: {
        Title: data.Title,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.UsergroupRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.UsergroupRepository.count();
    const usergroups = await this.UsergroupRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: usergroups,
    };
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.UsergroupRepository.createQueryBuilder('usergroup');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('usergroup.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('usergroup.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);

    return { items, totalCount };
  }
  async update(id: string, UpdateUsergroupDto: any) {
    this.UsergroupRepository.save(UpdateUsergroupDto);
    return await this.UsergroupRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.UsergroupRepository.delete(id);
    return { deleted: true };
  }
}
