import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-list-icon',
  templateUrl: './empty-list-icon.component.html',
  styleUrls: ['./empty-list-icon.component.scss'],
})
export class EmptyListIconComponent implements OnInit {
  public isFailed = false;
  public id = 0;

  constructor() {}

  public get iconFullName(): string {
    return `/assets/empty-list-icons/${this.id}.svg`;
  }

  ngOnInit(): void {
    this.id = this.getRandomIndex(17);
  }

  public onError(): void {
    this.isFailed = true;
  }

  private getRandomIndex(bound: number): number {
    return ((Math.random() * 100000) | 0) % bound;
  }
}
