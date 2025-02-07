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
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { FilterQuery } from '@mikro-orm/core';
import { Loan } from './entities/loan.entity';
import { NotFoundFilter } from '../common/not-found.filter';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  create(@Body(new ValidationPipe()) createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  find(@Query() whereParams: FilterQuery<Loan>) {
    return this.loansService.find(whereParams);
  }

  @Get(':id')
  @UseFilters(new NotFoundFilter())
  findOne(@Param('id') id: string) {
    return this.loansService.findById(id);
  }

  @Patch(':id')
  @UseFilters(new NotFoundFilter())
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(id, updateLoanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.loansService.remove(id);

    return { success: true };
  }
}
