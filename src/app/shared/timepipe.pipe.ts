import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timepipe'
})
export class TimepipePipe implements PipeTransform {

  transform(value: any) {
    return value.substr(0, 5);
  }

}
