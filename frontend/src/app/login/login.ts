import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  error = '';
  isDark = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.error = '';
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
      }
    });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
  }
}
