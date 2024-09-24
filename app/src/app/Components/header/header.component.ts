import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  constructor () {
    this.isLoggedIn = false;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    alert("logging out");
    this.isLoggedIn = false;
    window.location.reload()
  }
}
