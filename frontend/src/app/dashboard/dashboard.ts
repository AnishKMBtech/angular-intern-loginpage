import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; // Added import
import { QuizCardComponent } from '../quiz-card/quiz-card.component'; // Added import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, QuizCardComponent], // Added imports here
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}
