import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { Borrow } from '../entities/borrow.entity';
import { Renter } from '../entities/renter.entity';
import { Book } from '../entities/book.entity';
import { BorrowService } from '../borrow/borrow.service';
import { RenterService } from '../renter/renter.service';
import { BookService } from '../book/book.service';
import { AuthGuard } from '../auth/auth.guard';

import * as moment from 'moment';

@ApiTags('Borrows')
@Controller('api/v1/borrows')
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
    private readonly renterService: RenterService
  ) {}

  @Get()
  @ApiOkResponse({
    type: Borrow,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<Borrow[]> {
  	let list: Borrow[] = await this.borrowService.findAll();

  	return list;
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Book,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Res() res, @Param('id') id: number ): Promise<void> {
  	let borrow: Borrow = await this.borrowService.findOne(id);

    if(borrow == null || borrow == undefined) return res.status(400).json({ message: 'not found borrow' });

  	return res.status(200).json(borrow);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Borrow,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Res() res, @Body() borrow: Borrow): Promise<void> {
    if(!borrow.book) return res.status(400).json({ message: 'no book id' });
    if(!borrow.renter) return res.status(400).json({ message: 'no renter id' });

    let book: Book = await this.bookService.findOne(borrow.book);
    if(book == null || book == undefined) return res.status(400).json({ message: 'not found book' });
    if(book.isBorrowed == true) return res.status(400).json({ message: 'already borrowed book' });

    let renter: Renter = await this.renterService.findOne(borrow.renter);
    if(renter == null || renter == undefined) return res.status(400).json({ message: 'not found renter' });

    borrow.created_at = moment().unix();
    
    let insert = await this.borrowService.create(borrow);
    if(insert) {
      book.isBorrowed = true;
      let update = await this.bookService.update(Number(book.id), book);
    }

    return res.status(200).json({ message: `${book.name} with '${book.id}' id is borrowed to ${renter.name}` });
  }

  @Put('/return/:id')
  @ApiOkResponse({
    type: String,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async return(@Res() res, @Param('id') id: number ): Promise<void> {
    let borrow: Borrow = await this.borrowService.findOne(id);

    if(borrow == null || borrow == undefined) return res.status(400).json({ message: 'not found borrow' });
    if(borrow.isActive == false) return res.status(400).json({ message: 'already returned' });

    borrow.return_at = moment().unix();
    borrow.isActive = false;

    let returnBorrow = await this.borrowService.return(id, borrow);
    let book: Book;
    if(returnBorrow) {
      book = await this.bookService.findOne(borrow.book);
      book.isBorrowed = false;
      let updateBook = await this.bookService.update(Number(book.id), book);
    }

    return res.status(200).json({ message: `${book.name} with '${book.id}' id is returned` });
  }
}