import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'present'
})
export class PresentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? "Ingechecked": "Niet ingechecked";
  }

}
