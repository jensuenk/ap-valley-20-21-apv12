import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newEnTimeModal'
})
export class NewEnTimeModalPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
