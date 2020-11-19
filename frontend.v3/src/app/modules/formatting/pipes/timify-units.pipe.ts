import { Pipe, PipeTransform } from '@angular/core';
import { PadStartPipe } from './pad-start.pipe';

@Pipe({
  name: 'timifyUnits'
})
export class TimifyUnitsPipe implements PipeTransform {
  transform(units: number): string {
    const hours = Math.trunc(units / 60);
    const minutes = units % 60;

    return `${new PadStartPipe().transform(hours, '0', 2)}:${new PadStartPipe().transform(minutes, '0', 2)}`;
  }
}
