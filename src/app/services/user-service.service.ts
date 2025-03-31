import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../config/endpoints.enum';
import { Department, Post, User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getLists(): Observable<User[]> {
    return this.http.get<User[]>(`${Endpoints.URL}/users`);
  }

  getDepartment(): Observable<Department[]> {
    return this.http.get<Department[]>(`${Endpoints.URL}/department`);
  }

  getPosition(): Observable<Post[]> {
    return this.http.get<Post[]>(`${Endpoints.URL}/position`);
  }


  delete(id: string) {
    return this.http.delete(`${Endpoints.URL}/users/${id}`);
  }

  addProduct(body: User) {
    const resp = this.http.post(`${Endpoints.URL}/users`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return resp;
  }

  updateProduct(body: User) {
    return this.http.put(`${Endpoints.URL}/users/${body.id}`, body);
  }
}
