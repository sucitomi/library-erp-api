import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { Renter } from '../entities/renter.entity';
import { RenterService } from '../renter/renter.service';

@ApiTags('Renters')
@Controller('api/v1/renters')
export class RenterController {
  constructor(private readonly renterService: RenterService) {}

  @Get()
  @ApiOkResponse({
    type: Renter,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<Renter[]> {
  	let list: Renter[] = await this.renterService.findAll();

  	return list;
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Renter,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Res() res, @Param('id') id: number): Promise<void> {
  	let renter: Renter = await this.renterService.findOne(id);

    if(renter == null || renter == undefined) return res.status(400).json({ message: 'not found renter' });

  	return res.status(200).json(renter);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Renter,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() renter: Renter): Promise<Renter> {
    return this.renterService.create(renter);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: Renter,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(@Param('id') id: string, @Body() renter: Renter): Promise<void> {
    return this.renterService.update(Number(id), renter);
  }

  @Delete('/:id')
  @ApiOkResponse({
    type: String,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.renterService.remove(Number(id));
  }
}