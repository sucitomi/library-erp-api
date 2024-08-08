import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Borrow {
  @ApiProperty({
    type: Number,
    description: 'Auto generated id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Renter unique id',
  })
  @Column()
  renter: number;

  @ApiProperty({
    type: Number,
    description: 'Borrowed book unique id',
  })
  @Column()
  book: number;

  @ApiProperty({
    type: Number,
    description: 'Borrow created at in unixtimestamp',
  })
  @Column()
  created_at: number;

  @ApiProperty({
    type: Number,
    description: 'Borrow return at in unixtimestamp',
  })
  @Column({ default: null })
  return_at: number;

  @ApiProperty({
    type: Boolean,
    description: 'Borrow is active',
  })
  @Column({ default: true })
  isActive: boolean;
}