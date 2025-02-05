import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {BanggiaService } from './banggia.service';
  @Controller('banggia')
  export class BanggiaController {
    constructor(private readonly BanggiaService:BanggiaService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.BanggiaService.create(data);
    }
    @Get()
    async findAll() {
      return await this.BanggiaService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.BanggiaService.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.BanggiaService.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.BanggiaService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.BanggiaService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.BanggiaService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.BanggiaService.remove(id);
    }
  }