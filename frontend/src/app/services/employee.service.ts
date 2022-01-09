import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmployeeDetail } from '../models/employeeDetail';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Error {
  error: string;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEmployees(): Observable<EmployeeDetail> {
    return this.httpClient
      .get<EmployeeDetail>(`${this.apiUrl}`)
      .pipe(catchError(this.errorHandler));
  }

  getEmployeeDetail(id: number): Observable<EmployeeDetail> {
    return this.httpClient
      .get<EmployeeDetail>(`${this.apiUrl}/detail/` + id)
      .pipe(catchError(this.errorHandler));
  }

  createEmployee(employee: EmployeeDetail): Observable<EmployeeDetail> {
    return this.httpClient
      .post<EmployeeDetail>(`${this.apiUrl}/add`, employee, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  updateEmployee(employee: EmployeeDetail): Observable<EmployeeDetail> {
    return this.httpClient
      .put<EmployeeDetail>(`${this.apiUrl}/update`, employee, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: number) {
    return this.httpClient
      .delete<EmployeeDetail>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
