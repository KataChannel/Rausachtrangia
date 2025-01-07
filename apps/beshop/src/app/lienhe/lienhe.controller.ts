import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {LienheService } from './lienhe.service';
import { CreateLienheDto } from './dto/create-lienhe.dto';
import { UpdateLienheDto } from './dto/update-lienhe.dto';
@Controller('lienhe')
export class LienheController {
  constructor(private readonly lienheService:LienheService) {}

  @Post()
  create(@Body() createLienheDto: CreateLienheDto) {
    return this.lienheService.create(createLienheDto);
  }
  @Get()
  async findAll() {
    return await this.lienheService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.lienheService.findid(id);
  }
  @Get('findslug/:slug')
  async findslug(@Param('slug') slug: string) {
    return await this.lienheService.findslug(slug);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.lienheService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.lienheService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLienheDto: UpdateLienheDto) {
    return this.lienheService.update(id, updateLienheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lienheService.remove(id);
  }
}