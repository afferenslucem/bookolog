import { Component, ElementRef, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor/value-accessor';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileInputComponent),
    multi: true,
  }],
})
export class FileInputComponent extends ValueAccessorBase<any> implements OnInit {
  @Input()
  public accept: string = null;

  public get fileUrl(): string {
    return this._fileUrl ? `url(${this._fileUrl})` : null;
  }

  private _fileUrl: string | ArrayBuffer = null;

  constructor(private elRef: ElementRef<HTMLElement>) {
    super();
  }

  ngOnInit(): void {}

  public selectFile(event: Event): void {
    this.elRef.nativeElement
      .querySelector('input[type="file"]')
      // @ts-ignore
      .click();
  }

  public onFileChange(event: any): void {
    var files = event.target.files || event.dataTransfer.files;

    if (!files.length) return;

    const file = files[0];

    this.readFile(file);

    this.writeValue(file);
  }

  private readFile(file: File) {
    var reader = new FileReader();

    reader.onloadend = () => {
      this._fileUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
