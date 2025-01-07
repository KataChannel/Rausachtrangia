import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private MenuRepository: Repository<MenuEntity>
  ) { }
  async create(data: any) {    
    const check = await this.findslug(data.Slug)
    if(!check) {
      this.MenuRepository.create(data);
      return await this.MenuRepository.save(data);
    }
    else {
      return { error: 1001, data: "Trùng Dữ Liệu" }
    }

  }

  async findAll() {
    return await this.MenuRepository.find();
  }
  async listtype() {
    // const result =  await this.MenuRepository.find();
    // const result1 = result.map(item => item.Type);
    // const uniqueSlugs = new Set(result1.map((item:any) => item.Slug));
    // const uniqueData = Array.from(uniqueSlugs).map(slug => result1.find((item:any) => item.Slug === slug));  
    // return uniqueData
    const result = await this.MenuRepository.find();
    const uniqueSlugs = new Set(result.map((item:any) => item.Type.Slug));
    const uniqueData = Array.from(uniqueSlugs).map(slug => result.find((item:any) => item.Type.Slug === slug)?.Type);
    return uniqueData;
  }
  async findid(id: string) {
    return await this.MenuRepository.findOne({ where: { id: id } });
  }
  async findslug(Slug: any) {
    const result = await this.MenuRepository.findOne({
      where: { Slug: Slug },
    });    
    return result
  }
  async findQuery(params: any) {
    console.log(params);
    
    const queryBuilder = this.MenuRepository.createQueryBuilder('menu');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('menu.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.hasOwnProperty('Query')) {
      queryBuilder.andWhere('menu.Title LIKE :Title', { Title: `%${params.Query}%` })
      .orWhere('menu.Mota LIKE :Mota', { Mota: `%${params.Query}%` })
      .orWhere('menu.Noidung LIKE :Noidung', { Noidung: `%${params.Query}%` });
    }
    if (params.Title) {
      queryBuilder.andWhere('menu.Title LIKE :Title', { Title: `%${params.Title}%` });
    }
    if (params.hasOwnProperty('Type')) {
      queryBuilder.andWhere('menu.Type LIKE :Type', { Type: `%${params.Type}%` });
    }
    if (params.hasOwnProperty('Slug')) {
      queryBuilder.andWhere('menu.Type LIKE :Slug', { Slug: `%${params.Slug}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    return { items, totalCount };
  }
  async update(id: string, UpdateMenuDto: UpdateMenuDto) {
    await this.MenuRepository.save(UpdateMenuDto);
    return await this.MenuRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    await this.MenuRepository.delete(id);
    return { deleted: true };
  }
}
