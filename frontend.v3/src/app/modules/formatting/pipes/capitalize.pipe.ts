import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  
  transform(value: string): string;
  transform(value: string[]): string[];
  transform(value: string | string[]): string | string[] {
    if (Array.isArray(value)) {
      return value.map((item) => this.capitalize(item));
    } else {
      return this.capitalize(value);
    }
  }

  private capitalize(value: string): string {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }
}
