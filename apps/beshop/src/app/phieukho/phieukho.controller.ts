import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {PhieukhoService } from './phieukho.service';
  @Controller('Phieukho')
  export class PhieukhoController {
    constructor(private readonly PhieukhoService:PhieukhoService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.PhieukhoService.create(data);
    }
    @Get()
    async findAll() {
      return await this.PhieukhoService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.PhieukhoService.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.PhieukhoService.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.PhieukhoService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.PhieukhoService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.PhieukhoService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PhieukhoService.remove(id);
    }
  }