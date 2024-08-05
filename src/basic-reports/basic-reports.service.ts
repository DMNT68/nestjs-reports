import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmplymentLetterByIdReport, getEmplymentLetterReport, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to database');
  }

  constructor(private readonly printer: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Andrés Salgado' });

    const doc = this.printer.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmplymentLetterReport();

    const doc = this.printer.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmplymentLetterByIdReport({
      employerName: 'Fernando Herrera',	
      employerPosition: 'Gerente de HHUU',
      employercompany: 'Tucan Code Corp',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
    });

    const doc = this.printer.createPdf(docDefinition);

    return doc;
  }
}
