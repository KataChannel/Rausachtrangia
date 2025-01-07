import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {DonhangService } from './donhang.service';
import { CreateDonhangDto } from './dto/create-donhang.dto';
import { UpdateDonhangDto } from './dto/update-donhang.dto';
@Controller('donhang')
export class DonhangController {
  constructor(private readonly donhangService:DonhangService) {}

  @Post()
  create(@Body() data: any) {
    return this.donhangService.create(data);
  }
  @Get('getSoluong')
  async getSoluong() {
    return await this.donhangService.getSoluong();
  }
  @Get()
  async findAll() {
    return await this.donhangService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.donhangService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.donhangService.findslug(slug);
  }
  @Get('findmadonhang/:madonhang')
  async findmadonhang(@Param('madonhang') madonhang: string) {
    return await this.donhangService.findmadonhang(madonhang);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.donhangService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.donhangService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.donhangService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Body() data: any) {
    return this.donhangService.remove(id, data);
  }
}