import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'occupied'
})
export class OccupiedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? "Bezet": "Vrij";
  }

}
