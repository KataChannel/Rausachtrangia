import { PartialType } from '@nestjs/mapped-types';
import { CreateNhapkhoDto } from './create-nhapkho.dto';

export class UpdateNhapkhoDto extends PartialType(CreateNhapkhoDto) {}
