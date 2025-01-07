import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { VisitorEntity } from './entities/visitor.entity';
@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorEntity)
    private VisitorRepository: Repository<VisitorEntity>
  ) { }
  async create(data: any) {
    this.VisitorRepository.create(data);
    return await this.VisitorRepository.save(data);
    // const check = await this.findSHD(data)
    // if(!check) {
    //   this.VisitorRepository.create(data);
    //   return await this.VisitorRepository.save(data);
    // }
    // else {
    //   return { error: 1001, data: "Trùng Dữ Liệu" }
    // }
  }
  async findAll() {
    return await this.VisitorRepository.find();
  }
  async findid(id: string) {
    return await this.VisitorRepository.findOne({ where: { id: id } });
  }
  async findSHD(data: any) {
    return await this.VisitorRepository.findOne({
      where: {
        IPv4: data.IPv4,
        Type: data.Type
      },
    });
  }
  async findslug(Title: any) {
    return await this.VisitorRepository.findOne({
      where: { Title: Title },
    });
  }
  async findPagination(page: number, perPage: number) {
    const skip = (page - 1) * perPage;
    const totalItems = await this.VisitorRepository.count();
    const visitors = await this.VisitorRepository.find({ skip, take: perPage });
    return {
      currentPage: page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: visitors,
    };
  }
  async getvisitor() {
    
    const currentTime = new Date();
    const alldata = await this.VisitorRepository.find();
    const Total = alldata.length

    const Hientai = alldata.filter((v: any) => {
      const visitorDate = new Date(v.CreateAt);
      const timeDifference = (currentTime.getTime() - visitorDate.getTime()) / 1000; // in seconds
      return timeDifference < 180;
    })?.length || 1;

    const TotalNgay = alldata.filter((v: any) => {
      const visitorDate = new Date(v.CreateAt);
      return visitorDate.getDay() == currentTime.getDay();
    })?.length;

    const TotalThang = alldata.filter((v: any) => {
      const visitorDate = new Date(v.CreateAt);
      return visitorDate.getMonth() == currentTime.getMonth();
    })?.length;

    return { 'Tong': Total+1243647, 'Thang': TotalThang +2515, 'Ngay': TotalNgay, 'Hientai': Hientai }
  }
  async findQuery(params: any) {
    console.error(params);
    const queryBuilder = this.VisitorRepository.createQueryBuilder('visitor');
    if (params.Batdau && params.Ketthuc) {
      queryBuilder.andWhere('visitor.CreateAt BETWEEN :startDate AND :endDate', {
        startDate: params.Batdau,
        endDate: params.Ketthuc,
      });
    }
    if (params.Title) {
      queryBuilder.andWhere('visitor.Title LIKE :Title', { SDT: `%${params.Title}%` });
    }
    const [items, totalCount] = await queryBuilder
      .limit(params.pageSize || 10) // Set a default page size if not provided
      .offset(params.pageNumber * params.pageSize || 0)
      .getManyAndCount();
    console.log(items, totalCount);
    return { items, totalCount };
  }
  async update(id: string, UpdateVisitorDto: any) {
    this.VisitorRepository.save(UpdateVisitorDto);
    return await this.VisitorRepository.findOne({ where: { id: id } });
  }
  async remove(id: string) {
    console.error(id)
    await this.VisitorRepository.delete(id);
    return { deleted: true };
  }
}
