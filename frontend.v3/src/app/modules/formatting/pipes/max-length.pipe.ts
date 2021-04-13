import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength',
})
export class MaxLengthPipe implements PipeTransform {
  transform(value: string, length: number = null): string {
    if (!value) {
      return value;
    }

    if (!length || value.length <= length) {
      return value;
    } else {
      return value.slice(0, length) + '…';
    }
  }
}
