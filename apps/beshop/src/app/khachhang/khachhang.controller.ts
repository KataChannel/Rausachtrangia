import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {KhachhangService } from './khachhang.service';
import { CreateKhachhangDto } from './dto/create-khachhang.dto';
import { UpdateKhachhangDto } from './dto/update-khachhang.dto';
@Controller('khachhang')
export class KhachhangController {
  constructor(private readonly khachhangService:KhachhangService) {}

  @Post()
  create(@Body() createKhachhangDto: CreateKhachhangDto) {
    return this.khachhangService.create(createKhachhangDto);
  }
  @Get()
  async findAll() {
    return await this.khachhangService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.khachhangService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.khachhangService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.khachhangService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.khachhangService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKhachhangDto: UpdateKhachhangDto) {
    return this.khachhangService.update(id, updateKhachhangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.khachhangService.remove(id);
  }
}