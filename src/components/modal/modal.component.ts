import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../app/app.component';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  providers: [LocalStorageService],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  public lSService = new LocalStorageService();

  @Input() showModal = false;

  @Output() closeModal = new EventEmitter<void>();

  public editId: string | null = null;
  public newRecord: Article = {
    id: '',
    text: '',
  };

  public editRecord(id: string) {
    this.editId = id;
    const record = this.lSService.getAll().find((record) => record.id === id);
    if (record) {
      this.newRecord = record;
    }
  }

  public saveRecord() {
    if (this.editId !== null) {
      this.lSService.update(this.editId, this.newRecord);
    } else {
      this.lSService.add(this.newRecord);
    }

    this.clearEdit();
  }

  public clearEdit() {
    this.editId = null;
    this.newRecord = {
      id: '',
      text: '',
    };
  }
}
