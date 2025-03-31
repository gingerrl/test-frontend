import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Endpoints } from '../config/endpoints.enum';
import { Department, Post, User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getLists(): Observable<User[]> {
    return this.http
      .get<User[]>(`${Endpoints.URL}/users`)
      .pipe(catchError(() => of([])));
  }

  getDepartment(): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${Endpoints.URL}/department`)
      .pipe(catchError(() => of([])));
  }

  getPosition(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${Endpoints.URL}/position`)
      .pipe(catchError(() => of([])));
  }

  delete(id: string) {
    return this.http
      .delete(`${Endpoints.URL}/users/${id}`)
      .pipe(catchError(() => of([])));
  }

  addProduct(body: User) {
    return this.http
      .post(`${Endpoints.URL}/users`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(catchError(() => of([])));
  }

  updateProduct(body: User) {
    return this.http
      .put(`${Endpoints.URL}/users/${body.id}`, body)
      .pipe(catchError(() => of([])));
  }
}
