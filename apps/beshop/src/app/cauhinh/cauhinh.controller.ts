import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {CauhinhService } from './cauhinh.service';
@Controller('cauhinh')
export class CauhinhController {
  constructor(private readonly cauhinhService:CauhinhService) {}

  @Post()
  create(@Body() data: any) {
    return this.cauhinhService.create(data);
  }
  @Get()
  async findAll() {
    return await this.cauhinhService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.cauhinhService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.cauhinhService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.cauhinhService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.cauhinhService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.cauhinhService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cauhinhService.remove(id);
  }
}