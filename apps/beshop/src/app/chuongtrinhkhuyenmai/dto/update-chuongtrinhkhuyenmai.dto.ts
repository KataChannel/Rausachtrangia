import { PartialType } from '@nestjs/mapped-types';
import { CreateChuongtrinhkhuyenmaiDto } from './create-chuongtrinhkhuyenmai.dto';

export class UpdateChuongtrinhkhuyenmaiDto extends PartialType(CreateChuongtrinhkhuyenmaiDto) {}
