import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

import { Employe } from '../entities/employe.entity';
import { EmployeService } from '../employe/employe.service';

@ApiTags('Employers')
@Controller('api/v1/employees')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Get()
  @ApiOkResponse({
    type: Employe,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findAll(): Promise<Employe[]> {
  	let list = await this.employeService.findAll();

  	return list;
  }

  @Get('/:id')
  @ApiOkResponse({
    type: Employe,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Res() res, @Param('id') id: number ): Promise<void> {
  	let employe: Employe = await this.employeService.findOne(id);

    if(employe == null || employe == undefined) return res.status(400).json({ message: 'not found employe' });

  	return res.status(200).json(employe);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: Employe,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() employe: Employe): Promise<Employe> {
    return this.employeService.create(employe);
  }

  @Put('/:id')
  @ApiOkResponse({
    type: Employe,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(@Param('id') id: string, @Body() employe: Employe): Promise<void> {
    return this.employeService.update(Number(id), employe);
  }

  @Delete('/:id')
  @ApiOkResponse({
    type: String,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeService.remove(Number(id));
  }
}