import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

export interface RadioButtonOption<T> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-radio-button-list',
  standalone: true,
  imports: [],
  templateUrl: './radio-button-list.component.html',
  styleUrl: './radio-button-list.component.scss',
})
export class RadioButtonListComponent<T> {
  @HostBinding('style') style = 'width:100%;';
  @Input() options: RadioButtonOption<T>[] = [];
  @Input() set initialValue(value: T) {
    this.selectedValue = value ?? null;
  }
  @Output() selectionChange = new EventEmitter<T>();

  public selectedValue: T | null = null;
  public onSelectionChange(value: T) {
    if (this.selectedValue !== value) {
      this.selectedValue = value;

      this.selectionChange.emit(value);
    }
  }
}
