import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../main/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-empty-list-icon',
  templateUrl: './empty-list-icon.component.html',
  styleUrls: ['./empty-list-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListIconComponent implements OnInit {
  public id: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public retries = 0;
  public isFailed = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.id.next(this.getRandomIndex(148));
  }

  public onLoad(): void {
    this.appendKnownIcon();
  }

  public onError(): void {
    this.retries++;

    if (this.retries > 2) {
      this.isFailed = true;
      return;
    }

    const set = this.readIconSet();
    this.id.next(this.chooseRandomIcon(set));
  }

  public appendKnownIcon(): void {
    const set = this.readIconSet();
    set.add(this.id.value);

    this.writeIconSet(set);
  }

  public get iconFullName(): Observable<string> {
    return this.id.pipe(map(item => `/assets/empty-list-icons/${item}.svg`));
  }

  public readIconSet(): Set<number> {
    const icons = this.localStorageService.getItem('knownIcons');

    if (icons) {
      const set = new Set<number>(JSON.parse(icons));

      return set;
    } else {
      return new Set<number>();
    }
  }

  public setToArray(set: Set<number>): number[] {
    return Array.from(set);
  }

  public writeIconSet(set: Set<number>): void {
    const array = this.setToArray(set);

    const json = JSON.stringify(array);

    this.localStorageService.setItem('knownIcons', json);
  }

  public chooseRandomIcon(set: Set<number>): number {
    if (set.size === 0) return null;

    const index = this.getRandomIndex(set.size);

    const array = this.setToArray(set);

    return array[index];
  }

  private getRandomIndex(bound: number): number {
    return ((Math.random() * 100000) | 0) % bound;
  }
}
