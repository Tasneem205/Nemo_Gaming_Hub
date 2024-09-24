import { Component , OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hackathon',
  standalone: true,
  imports: [],
  templateUrl: './hackathon.component.html',
  styleUrl: './hackathon.component.css'
})
export class HackathonComponent implements OnInit, OnDestroy {
  timeLeft: any = {};  // Object to hold time values (days, hours, etc.)
  targetDate: Date;
  private subscription!: Subscription;

  constructor() {
    // Set the target date to October 1st of the current year
    const currentYear = new Date().getFullYear();
    this.targetDate = new Date(`October 1, ${currentYear} 00:00:00`);
  }

  ngOnInit() {
    // Update the countdown every second
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance > 0) {
      // Calculate time left
      this.timeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    } else {
      // Countdown is finished
      this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }
}
