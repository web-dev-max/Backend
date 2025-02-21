import { ImportService } from './import.service';
import { Controller } from '@nestjs/common';

@Controller()
export class ImportController {
  constructor(private readonly importService: ImportService) {}
}
