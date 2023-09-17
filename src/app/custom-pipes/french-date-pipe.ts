import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'frenchDate',
})
export class FrenchDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: string): string {
    const date = new Date(value);
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy', 'fr-FR');

    return formattedDate ?? 'Invalid Date';
  }
}
