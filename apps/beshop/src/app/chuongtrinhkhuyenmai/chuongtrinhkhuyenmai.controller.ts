import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import {ChuongtrinhkhuyenmaiService } from './chuongtrinhkhuyenmai.service';
import { CreateChuongtrinhkhuyenmaiDto } from './dto/create-chuongtrinhkhuyenmai.dto';
import { UpdateChuongtrinhkhuyenmaiDto } from './dto/update-chuongtrinhkhuyenmai.dto';
@Controller('chuongtrinhkhuyenmai')
export class ChuongtrinhkhuyenmaiController {
  constructor(private readonly chuongtrinhkhuyenmaiService:ChuongtrinhkhuyenmaiService) {}

  @Post()
  create(@Body() createChuongtrinhkhuyenmaiDto: CreateChuongtrinhkhuyenmaiDto) {
    return this.chuongtrinhkhuyenmaiService.create(createChuongtrinhkhuyenmaiDto);
  }
  @Get()
  async findAll() {
    return await this.chuongtrinhkhuyenmaiService.findAll();
  }
  @Get('findid/:id')
  async findOne(@Param('id') id: string) {
    return await this.chuongtrinhkhuyenmaiService.findid(id);
  }
  @Get('findcode/:code')
  async findslug(@Param('code') code: string) {
    return await this.chuongtrinhkhuyenmaiService.findCode(code);
  }
  @Get('pagination')
  async findPagination(@Query('page') page: number,@Query('perPage') perPage: number){
       return await this.chuongtrinhkhuyenmaiService.findPagination(page,perPage);
    }
  @Post('search')
    async findQuery(@Body() SearchParams: any){
      return await this.chuongtrinhkhuyenmaiService.findQuery(SearchParams);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChuongtrinhkhuyenmaiDto: UpdateChuongtrinhkhuyenmaiDto) {
    return this.chuongtrinhkhuyenmaiService.update(id, updateChuongtrinhkhuyenmaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chuongtrinhkhuyenmaiService.remove(id);
  }
}