import { PartialType } from '@nestjs/mapped-types';
import { CreateBaivietDto } from './create-baiviet.dto';

export class UpdateBaivietDto extends PartialType(CreateBaivietDto) {}
