import { PartialType } from '@nestjs/mapped-types';
import { CreateTonkhoDto } from './create-tonkho.dto';

export class UpdateTonkhoDto extends PartialType(CreateTonkhoDto) {}
