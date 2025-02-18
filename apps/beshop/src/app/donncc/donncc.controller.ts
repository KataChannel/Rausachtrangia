import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {DonnccService } from './donncc.service';
  @Controller('donncc')
  export class DonnccController {
    constructor(private readonly DonnccService:DonnccService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.DonnccService.create(data);
    }
    @Get()
    async findAll() {
      return await this.DonnccService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.DonnccService.findid(id);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.DonnccService.findPagination(page,perPage);
    }
    @Post('search')
    async search(@Body() search: any){
        return await this.DonnccService.search(search);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.DonnccService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.DonnccService.remove(id);
    }
  }