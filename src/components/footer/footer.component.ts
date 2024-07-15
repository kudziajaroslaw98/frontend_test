import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Output()
  public clearSettings = new EventEmitter<void>();

  @Output()
  public showCredentials = new EventEmitter<void>();

  @Output()
  public openModal = new EventEmitter<void>();
}
