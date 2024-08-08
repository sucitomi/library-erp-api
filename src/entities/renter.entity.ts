import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Renter {
  @ApiProperty({
    type: Number,
    description: 'Auto generated id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Renter name, varchar(256)',
  })
  @Column("varchar", { length: 256 })
  name
}