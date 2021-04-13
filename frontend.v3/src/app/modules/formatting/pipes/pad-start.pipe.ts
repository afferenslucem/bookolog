import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart',
})
export class PadStartPipe implements PipeTransform {
  transform(str: any, filler: string, totalLen: number): string {
    return str.toString().padStart(totalLen, filler);
  }
}
