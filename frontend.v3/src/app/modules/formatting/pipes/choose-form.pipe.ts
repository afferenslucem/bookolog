import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chooseForm',
})
export class ChooseFormPipe implements PipeTransform {
  transform(count: number, label1: any, label2: any, label3: any): any {
    const lostBy100 = count % 100;
    const lostBy10 = count % 10;

    if ((lostBy100 < 20 && lostBy100 > 10) || lostBy10 > 4 || lostBy10 === 0) {
      return label3;
    } else if (lostBy10 === 1) {
      return label1;
    } else {
      return label2;
    }
  }
}
