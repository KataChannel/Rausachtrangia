import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {QuanlykhoService } from './quanlykho.service';
  @Controller('quanlykho')
  export class QuanlykhoController {
    constructor(private readonly QuanlykhoService:QuanlykhoService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.QuanlykhoService.create(data);
    }
    @Get()
    async findAll() {
      return await this.QuanlykhoService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.QuanlykhoService.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.QuanlykhoService.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.QuanlykhoService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.QuanlykhoService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.QuanlykhoService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.QuanlykhoService.remove(id);
    }
  }