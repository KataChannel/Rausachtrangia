import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateNhapkhoDto } from './dto/create-nhapkho.dto';
import { UpdateNhapkhoDto } from './dto/update-nhapkho.dto';
import { NhapkhoEntity } from './entities/nhapkho.entity';
@Injectable()
export class NhapkhoService {
  constructor(
    @InjectRepository(NhapkhoEntity)
    private NhapkhoRepository: Repository<NhapkhoEntity>
  ) { }
  async create(data: any) {    
    const check = await this.findslug(data.Slug)
    if(!check) {
      this.NhapkhoRepository.create(data);
      return await this.NhapkhoRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.NhapkhoRepository.find();
  }
  async listtype() {
    // const result =  await this.NhapkhoRepository.find();
    // const result1 = result.map(item => item.Type);
    // const uniqueSlugs = new Set(result1.map((item:any) => item.Slug));
    // const uniqueData = Array.from(uniqueSlugs).map(slug => result1.find((item:any) => item.Slug === slug));  
    // return uniqueData
    const result = await this.NhapkhoRepository.find();
    const uniqueSlugs = new Set(result.map((item:any) => item.Type.Slug));
    const uniqueData = Array.from(uniqueSlugs).map(slug => result.find((item:any) => item.Type.Slug === slug)?.Type);
    return uniqueData;
  }
  async findid(id: string) {
    return await this.NhapkhoRepository.findOne({ where: { id: id } });
  }
  // async findSHD(data: any) {
  //   return await this.NhapkhoRepository.findOne({
  //     where: {
  //       SHD: data.SHD,
  //       Type: data.Type
  //     },
  //   });
  // }
  async findslug(idSP: any) {
    const result = await this.NhapkhoRepository.findOne({
      where: { idSP: idSP },
    });    
    return result
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.NhapkhoRepository.count();
    const nhapkhos = await this.NhapkhoRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: nhapkhos,
    };
  }
  async findQuery(params: any) {
    console.log(params);
    
    const queryBuilder = this.NhapkhoRepository.createQueryBuilder('nhapkho');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('nhapkho.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('nhapkho.Title LIKE :Title', { Title: `%${params.Query}%` })
      .orWhere('nhapkho.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      .orWhere('nhapkho.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Title) {
      queryBuilder.andWhere('nhapkho.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('nhapkho.Type LIKE :Type', { Type: `%${params.Type}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('nhapkho.Type LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateNhapkhoDto: UpdateNhapkhoDto) {
    this.NhapkhoRepository.save(UpdateNhapkhoDto);
    return await this.NhapkhoRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.NhapkhoRepository.delete(id);
    return { deleted: true };
  }
}
