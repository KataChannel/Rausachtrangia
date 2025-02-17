import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {PhieugiaodichService } from './phieugiaodich.service';
  @Controller('phieugiaodich')
  export class PhieugiaodichController {
    constructor(private readonly PhieugiaodichService:PhieugiaodichService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.PhieugiaodichService.create(data);
    }
    @Get()
    async findAll() {
      return await this.PhieugiaodichService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.PhieugiaodichService.findid(id);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.PhieugiaodichService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.PhieugiaodichService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.PhieugiaodichService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PhieugiaodichService.remove(id);
    }
  }