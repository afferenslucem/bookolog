import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string;
  transform(value: string[]): string[];
  transform(value: string | string[]): string | string[] {
    if (!value) {
      return value;
    }

    if (Array.isArray(value)) {
      return this.capitalizeArray(value);
    } else {
      return this.capitalize(value);
    }
  }

  private capitalize(value: string): string {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }

  private capitalizeArray(value: string[]): string[] {
    if (value == null) {
      return [];
    }
    return value.map((item) => this.capitalize(item));
  }
}
