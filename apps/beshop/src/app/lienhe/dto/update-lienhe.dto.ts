import { PartialType } from '@nestjs/mapped-types';
import { CreateLienheDto } from './create-lienhe.dto';

export class UpdateLienheDto extends PartialType(CreateLienheDto) {}
