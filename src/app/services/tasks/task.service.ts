import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { TaskDto } from './task.models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = `${environment.apiUrl}/api/tasks`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.baseUrl);
  }

  createTask(task: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, task, { headers: this.headers });
  }

  updateTaskStatus(id: number, status: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, { status }, { headers: this.headers });
  }
}