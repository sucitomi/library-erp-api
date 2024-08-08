import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Book {
  @ApiProperty({
    type: Number,
    description: 'Auto generated id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'Book name, varchar(256)',
  })
  @Column("varchar", { length: 256 })
  name;

  @ApiProperty({
    type: String,
    description: 'Book author, varchar(128)',
  })
  @Column("varchar", { length: 128 })
  author;

  @ApiProperty({
    type: String,
    description: 'Book description',
  })
  @Column("text")
  description;

  @ApiProperty({
    type: Boolean,
    description: 'Book borrowed property',
  })
  @Column({ default: false })
  isBorrowed: boolean;
}