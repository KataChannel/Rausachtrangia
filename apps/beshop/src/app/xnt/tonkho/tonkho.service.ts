import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTonkhoDto } from './dto/create-tonkho.dto';
import { UpdateTonkhoDto } from './dto/update-tonkho.dto';
import { TonkhoEntity } from './entities/tonkho.entity';
@Injectable()
export class TonkhoService {
  constructor(
    @InjectRepository(TonkhoEntity)
    private TonkhoRepository: Repository<TonkhoEntity>
  ) { }
  async create(data: any) {    
    this.TonkhoRepository.create(data);
    return await this.TonkhoRepository.save(data);
    // const check = await this.findslug(data.Slug)
    // if(!check) {
    //   this.TonkhoRepository.create(data);
    //   return await this.TonkhoRepository.save(data);
    // }
    // else {
    //   return { error: 1001, data: "Trùng Dữ Liệu" }
    // }
  }

  async findAll() {
    return await this.TonkhoRepository.find();
  }
  async listtype() {
    // const result =  await this.TonkhoRepository.find();
    // const result1 = result.map(item => item.Type);
    // const uniqueSlugs = new Set(result1.map((item:any) => item.Slug));
    // const uniqueData = Array.from(uniqueSlugs).map(slug => result1.find((item:any) => item.Slug === slug));  
    // return uniqueData
    const result = await this.TonkhoRepository.find();
    const uniqueSlugs = new Set(result.map((item:any) => item.Type.Slug));
    const uniqueData = Array.from(uniqueSlugs).map(slug => result.find((item:any) => item.Type.Slug === slug)?.Type);
    return uniqueData;
  }
  async findid(id: string) {
    return await this.TonkhoRepository.findOne({ where: { id: id } });
  }
  async findidsp(idSP: string) {
    return await this.TonkhoRepository.findOne({ where: { idSP: idSP } });
  }
  // async findSHD(data: any) {
  //   return await this.TonkhoRepository.findOne({
  //     where: {
  //       SHD: data.SHD,
  //       Type: data.Type
  //     },
  //   });
  // }
  async findslug(idSP: any) {
    const result = await this.TonkhoRepository.findOne({
      where: { idSP: idSP },
    });    
    return result
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.TonkhoRepository.count();
    const tonkhos = await this.TonkhoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: tonkhos,
    };
  }
  async findQuery(params: any) {
    console.log(params);
    
    const queryBuilder = this.TonkhoRepository.createQueryBuilder('tonkho');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('tonkho.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('tonkho.Title LIKE :Title', { Title: `%${params.Query}%` })
      .orWhere('tonkho.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      .orWhere('tonkho.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Title) {
      queryBuilder.andWhere('tonkho.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('tonkho.Type LIKE :Type', { Type: `%${params.Type}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('tonkho.Type LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateTonkhoDto: UpdateTonkhoDto) {
    this.TonkhoRepository.save(UpdateTonkhoDto);
    return await this.TonkhoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.TonkhoRepository.delete(id);
    return { deleted: true };
  }
}
