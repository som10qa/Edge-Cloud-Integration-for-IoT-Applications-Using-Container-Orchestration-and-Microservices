import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  // Properties bound to form fields
  username = '';
  password = '';
  
  // Message for success or error feedback
  message = '';
  
  // Simple flag to indicate loading state
  isLoading = false;

  constructor(private apiService: ApiService) {}

  // Method to register a new user using POST /register endpoint
  register(): void {
    this.isLoading = true;
    const credentials = { username: this.username, password: this.password };

    this.apiService.register(credentials).subscribe({
      next: (res: any) => { 
        console.log('Registartion response:', res);
        this.message = res.message; 
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.message = err.error?.message || 'Registration failed'; 
        // this.isLoading = false;
      }
    });
  }

  // Method to log in a user using POST /login endpoint
  login(): void {
    console.log('Login called:', { username: this.username, password: this.password });
    this.apiService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => { 
        console.log('Login response:', res);
        this.message = res.message;
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.message = err.error?.message || 'Login failed';
      }
    });
  }
}
