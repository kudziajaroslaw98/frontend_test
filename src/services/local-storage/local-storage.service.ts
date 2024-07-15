import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Article } from '../../app/app.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'articles';

  constructor() {}

  public getAll(): Article[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  public add(record: Article): void {
    const records = this.getAll();
    const newRecord = { ...record, id: uuidv4() };

    records.push(newRecord);
    this.save(records);
  }

  public update(id: string, updatedRecord: Article): void {
    const records = this.getAll();
    const index = records.findIndex((record) => record.id === id);

    if (index !== -1) {
      records[index] = updatedRecord;
      this.save(records);
    } else {
      throw new Error('Record not found');
    }
  }

  public delete(id: string): void {
    const records = this.getAll();
    const index = records.findIndex((record) => record.id === id);

    if (index !== -1) {
      records.splice(index, 1);
      this.save(records);
    } else {
      throw new Error('Record not found');
    }
  }

  public initialize(data: Article[] = []): void {
    this.save(data);
  }

  private save(records: Article[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(records));
  }
}
