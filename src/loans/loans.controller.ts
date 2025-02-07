import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UseFilters,
  Res,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { FilterQuery, wrap } from '@mikro-orm/core';
import { Loan } from './entities/loan.entity';
import { NotFoundFilter } from '../common/not-found.filter';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Response } from 'express';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiCreatedResponse({
    type: Loan,
    description: 'Successful creation of a loan application',
  })
  async create(@Body(new ValidationPipe()) createLoanDto: CreateLoanDto) {
    const newLoan = await this.loansService.create(createLoanDto);
    return wrap(newLoan).toJSON();
  }

  @Get()
  @ApiOkResponse({
    type: [Loan],
    description: 'List of loan applications',
  })
  find(@Query() whereParams: FilterQuery<Loan>) {
    return this.loansService.find(whereParams);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The loan application ID',
  })
  @ApiOkResponse({
    type: Loan,
    description: 'The loan application found by ID',
  })
  @UseFilters(new NotFoundFilter())
  findOne(@Param('id') id: string) {
    return this.loansService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The loan application ID',
  })
  @ApiOkResponse({
    type: Loan,
    description: 'The loan application updated by ID',
  })
  @UseFilters(new NotFoundFilter())
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The loan application ID',
  })
  @ApiNoContentResponse({
    description: 'The loan application deleted by ID',
  })
  async remove(@Param('id') id: string, @Res() response: Response) {
    await this.loansService.remove(id);
    return response.status(204).end();
  }
}
