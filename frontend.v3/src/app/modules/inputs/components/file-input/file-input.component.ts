import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent extends ValueAccessorBase<any> implements OnInit {
  @Input()
  public accept: string = null;

  @Output()
  public fileChanged = new EventEmitter<Event>();

  constructor(private elRef: ElementRef<HTMLElement>) {
    super();
  }

  private _fileUrl: string | ArrayBuffer = null;

  public get fileUrl(): string {
    return this._fileUrl ? `url(${this._fileUrl})` : null;
  }

  @Input()
  public set fileUrl(v: string) {
    this._fileUrl = v;
  }

  ngOnInit(): void {}

  public selectFile(): void {
    this.elRef.nativeElement.querySelector<HTMLElement>('input[type="file"]').click();
  }

  public onFileChange(event: any): void {
    const files = event.target.files || event.dataTransfer.files;

    if (!files.length) {
      return;
    }

    const file = files[0];

    this.readFile(file);

    this.writeValue(file);

    this.fileChanged.emit(event);
  }

  private readFile(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this._fileUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
