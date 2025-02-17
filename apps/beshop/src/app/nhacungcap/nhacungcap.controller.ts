import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
  import {NhacungcapService } from './nhacungcap.service';
  @Controller('nhacungcap')
  export class NhacungcapController {
    constructor(private readonly NhacungcapService:NhacungcapService) {}
  
    @Post()
    create(@Body() data: any) {
      return this.NhacungcapService.create(data);
    }
    @Get()
    async findAll() {
      return await this.NhacungcapService.findAll();
    }
    @Get('findid/:id')
    async findOne(@Param('id') id: string) {
      return await this.NhacungcapService.findid(id);
    }
    @Get('findslug/:slug')
    async findslug(@Param('slug') slug: string) {
      return await this.NhacungcapService.findslug(slug);
    }
    @Get('pagination')
    async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
         return await this.NhacungcapService.findPagination(page,perPage);
      }
    @Post('search')
      async findQuery(@Body() SearchParams: any){
        return await this.NhacungcapService.findQuery(SearchParams);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.NhacungcapService.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.NhacungcapService.remove(id);
    }
  }