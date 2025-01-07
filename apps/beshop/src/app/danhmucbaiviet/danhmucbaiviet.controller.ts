import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {DanhmucbaivietService } from './danhmucbaiviet.service';
@Controller('danhmucbaiviet')
export class DanhmucbaivietController {
  constructor(private readonly danhmucbaivietService:DanhmucbaivietService) {}

  @Post()
  create(@Body() data: any) {
    return this.danhmucbaivietService.create(data);
  }
  @Get()
  async findAll() {
    return await this.danhmucbaivietService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.danhmucbaivietService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.danhmucbaivietService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.danhmucbaivietService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.danhmucbaivietService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.danhmucbaivietService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhmucbaivietService.remove(id);
  }
}