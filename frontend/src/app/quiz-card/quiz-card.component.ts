import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-card',
  standalone: true, // Added for standalone component
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent {
  @Input() title: string = '';
  @Input() details: string = '';
}
