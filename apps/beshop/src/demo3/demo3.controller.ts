import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {Demo3Service } from './demo3.service';
@Controller('Demo3')
export class Demo3Controller {
  constructor(private readonly Demo3Service:Demo3Service) {}

  @Post()
  create(@Body() data: any) {
    return this.Demo3Service.create(data);
  }
  @Get()
  async findAll() {
    return await this.Demo3Service.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.Demo3Service.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.Demo3Service.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.Demo3Service.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.Demo3Service.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.Demo3Service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.Demo3Service.remove(id);
  }
}