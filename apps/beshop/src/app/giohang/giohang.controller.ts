import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {GiohangService } from './giohang.service';
import { CreateGiohangDto } from './dto/create-giohang.dto';
import { UpdateGiohangDto } from './dto/update-giohang.dto';
@Controller('giohang')
export class GiohangController {
  constructor(private readonly giohangService:GiohangService) {}

  @Post()
  create(@Body() createGiohangDto: CreateGiohangDto) {
    return this.giohangService.create(createGiohangDto);
  }
  @Get()
  async findAll() {
    return await this.giohangService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.giohangService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.giohangService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.giohangService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.giohangService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiohangDto: UpdateGiohangDto) {
    return this.giohangService.update(id, updateGiohangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giohangService.remove(id);
  }
}