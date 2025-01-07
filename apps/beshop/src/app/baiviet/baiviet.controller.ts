import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {BaivietService } from './baiviet.service';
import { CreateBaivietDto } from './dto/create-baiviet.dto';
import { UpdateBaivietDto } from './dto/update-baiviet.dto';
@Controller('baiviet')
export class BaivietController {
  constructor(private readonly baivietService:BaivietService) {}

  @Post()
  create(@Body() createBaivietDto: CreateBaivietDto) {
    return this.baivietService.create(createBaivietDto);
  }
  @Get()
  async findAll() {
    return await this.baivietService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.baivietService.findid(id);
  }
  @Get('listtype')
  async listtype() {
    return await this.baivietService.listtype();
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.baivietService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.baivietService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){      
      return await this.baivietService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaivietDto: UpdateBaivietDto) {
    return this.baivietService.update(id, updateBaivietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baivietService.remove(id);
  }
}