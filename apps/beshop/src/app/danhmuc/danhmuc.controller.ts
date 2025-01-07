import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {DanhmucService } from './danhmuc.service';
import { CreateDanhmucDto } from './dto/create-danhmuc.dto';
import { UpdateDanhmucDto } from './dto/update-danhmuc.dto';
@Controller('danhmuc')
export class DanhmucController {
  constructor(private readonly danhmucService:DanhmucService) {}

  @Post()
  create(@Body() createDanhmucDto: CreateDanhmucDto) {
    return this.danhmucService.create(createDanhmucDto);
  }
  @Get()
  async findAll() {
    return await this.danhmucService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.danhmucService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.danhmucService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.danhmucService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.danhmucService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDanhmucDto: UpdateDanhmucDto) {
    return this.danhmucService.update(id, updateDanhmucDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhmucService.remove(id);
  }
}