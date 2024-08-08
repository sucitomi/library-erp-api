import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Employe {
  @ApiProperty({
    type: Number,
    description: 'Auto generated id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Employe name, varchar(64)',
  })
  @Column("varchar", { length: 64 })
  name;

  @ApiProperty({
    type: String,
    description: 'Employe username, varchar(64)',
  })
  @Column("varchar", { length: 64 })
  username;

  @ApiProperty({
    type: String,
    description: 'Employe password in bcrypt hash, varchar(128)',
  })
  @Column("varchar", { length: 128 })
  password;

  @ApiProperty({
    type: Boolean,
    description: 'Employe active property',
  })
  @Column({ default: true })
  isActive: boolean;
}