import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart'
})
export class PadStartPipe implements PipeTransform {

  transform(str: string, filler: string, totalLen: number): string {
    const diff = totalLen - str.toString().length;

    return filler.repeat(diff) + str;
  }

}
