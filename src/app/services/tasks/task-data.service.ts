import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private statuses = ['Completed', 'InProgress', 'NotStarted'];
  private users = ['Volodymyr', 'Igor', 'Vasyl', 'Vitaliy'];

  constructor() {}

  getStatuses(): string[] {
    return this.statuses;
  }

  getUsers(): string[] {
    return this.users;
  }
}