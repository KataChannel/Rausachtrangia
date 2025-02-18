import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Like, Repository } from 'typeorm';
import { DonnccitemEntity } from './donnccitem.entity';
  @Injectable()
  export class DonnccitemService {
    constructor(
      @InjectRepository(DonnccitemEntity)
      private DonnccitemRepository: Repository<DonnccitemEntity>
    ) { }
    async create(data: any) {
        this.DonnccitemRepository.create(data);
        const item = data.Sanpham.map((v:any)=>({
          idDonncc:data.id,
          idSP:v.id,
          Soluong:v.Soluong
        }))
        delete data.Sanpham
        await this.DonnccitemRepository.save(item);
        return await this.DonnccitemRepository.save(data);  
    }
  
    async findAll() {
      return await this.DonnccitemRepository.find();
    }
    async findid(id: string) {
      return await this.DonnccitemRepository.findOne({ where: { id: id } });
    }
    async update(id: string, UpdateDonnccitemDto: any) {
      this.DonnccitemRepository.save(UpdateDonnccitemDto);
      return await this.DonnccitemRepository.findOne({ where: { id: id } });
    }
    async remove(id: string) {
      console.error(id)
      await this.DonnccitemRepository.delete(id);
      return { deleted: true };
    }
  }