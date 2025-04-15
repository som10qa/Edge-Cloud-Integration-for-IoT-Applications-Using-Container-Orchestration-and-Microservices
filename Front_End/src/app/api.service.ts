import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   private baseUrl = environment.baseIp;  

  constructor(private http: HttpClient) {}

  // Login endpoint (port 5000)
  // Even though the Flask endpoint supports GET for informational purposes, our app uses POST for sending credentials.
  login(credentials: { username: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}:5000/login`;
    return this.http.post(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  // Register endpoint (port 5000)
  register(credentials: { username: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}:5000/register`;
    return this.http.post(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  // Post sensor data (port 3000)
  postSensorData(sensor: string, value: number): Observable<any> {
    const url = `${this.baseUrl}:3000/data`;
    return this.http.post(url, { sensor, value }).pipe(
      catchError(this.handleError)
    );
  }

  // Get sensor data (port 3000)
  getSensorData(): Observable<any> {
    const url = `${this.baseUrl}:3000/data`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Send a notification (port 8080)
  sendNotification(message: string): Observable<any> {
    const url = `${this.baseUrl}:8080/notify`;
    return this.http.post(url, { message }).pipe(
      catchError(this.handleError)
    );
  }

  // Subscribe to notifications using Server-Sent Events (SSE) (port 4000)
  subscribeToNotifications(): Observable<string> {
    const url = `${this.baseUrl}:4000/subscribe`;
    return new Observable<string>((observer) => {
      const eventSource = new EventSource(url);
      eventSource.onmessage = (event: MessageEvent) => {
        observer.next(event.data);
      };
      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };
      // Cleanup on unsubscription
      return () => {
        eventSource.close();
      };
    });
  }

  // Error handler for HTTP requests
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong; please try again later.');
  }
}
