import { ImportService } from './import.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get('imports')
  async importProducts() {
    await this.importService.importProducts();
    return { message: 'Products imported successfully' };
  }
}
