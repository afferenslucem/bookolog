import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { debounce, debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Timer } from 'essents';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public isClosed = true;
  public input: FormControl = new FormBuilder().control(null);

  private destroy$ = new Subject();

  constructor(private searchService: SearchService, private router: Router, private elRef: ElementRef<HTMLElement>) {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        filter(event => event instanceof NavigationEnd),
      )
      .subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.input.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => this.searchService.filter$.next(value));
  }

  public close(): void {
    this.input.setValue('');
    this.isClosed = true;
  }

  public open(): void {
    this.isClosed = false;
    new Timer(() => this.elRef.nativeElement.querySelector('input').focus(), 300).start();
  }
}
