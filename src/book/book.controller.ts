import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { Book } from '../entities/book.entity';
import { BookService } from '../book/book.service';

@ApiTags('Books')
@Controller('api/v1/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOkResponse({
    type: Book,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<Book[]> {
  	let list: Book[] = await this.bookService.findAll();

  	return list;
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Book,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Res() res, @Param('id') id: number): Promise<void> {
  	let book: Book = await this.bookService.findOne(id);

    if(book == null || book == undefined) return res.status(400).json({ message: 'not found book' });

  	return res.status(200).json(book);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Book,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() book: Book): Promise<Book> {
    delete book.id;
    return this.bookService.create(book);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: Book,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(@Param('id') id: string, @Body() book: Book): Promise<void> {
    return this.bookService.update(Number(id), book);
  }

  @Delete('/:id')
  @ApiOkResponse({
    type: String,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(Number(id));
  }
}