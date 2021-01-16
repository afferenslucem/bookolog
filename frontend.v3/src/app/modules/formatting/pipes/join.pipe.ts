import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: string | string[], separator = ', '): string {
    if (Array.isArray(value)) {
      return value.join(separator);
    } else {
      return value;
    }
  }
}
